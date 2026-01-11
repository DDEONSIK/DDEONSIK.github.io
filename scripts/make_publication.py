from itertools import chain
import json
import re
from pathlib import Path

def __Has_korean__(text: str):
    """Check if the text contains any Korean characters."""
    if not text:
        return False
    _pattern = re.compile(r'[\uac00-\ud7a3]')
    return bool(_pattern.search(text))

def __Author_parser__(authors: str | list[dict]):
    """Convert author list to string representation."""
    if isinstance(authors, str):
        return authors
    if not isinstance(authors, list):
        return ""
    _parser = []
    for _person in authors:
        if "literal" in _person:
            _parser.append(_person["literal"])  # save full name
        elif "family" in _person or "given" in _person:
            _family = _person.get("family", "")
            _given = _person.get("given", "")
            if __Has_korean__(_family) or __Has_korean__(_given):
                name = f"{_family}{_given}".strip()
                _parser.append(name)
            else:
                parts = []
                if _family:
                    parts.append(_family)
                if _given:
                    parts.append(_given)
                _parser.append(", ".join(parts))
    return ", ".join(_parser)

def __Get_data_from__(data_root: Path, pub_type: str):
    """Loads and processes a single publication file."""
    _file_path = data_root / f"{pub_type}.json"

    if not _file_path.exists():
        print(f"Warning: File not found: {_file_path}")
        return []

    with _file_path.open("r", encoding="UTF-8") as _f:
        try:
            _meta_data: list[dict] = json.load(_f)
        except json.JSONDecodeError:
            return []

    _processed = []
    for _item in _meta_data:
        _title = _item.get("title", "")

        # 출판 정보
        _pub_title = _item.get("container-title", "")
        _event_title = _item.get("event-title", "")

        # Determine category
        # 1. Check for explicit "Domestic" keyword in venue
        if any("국내" in _txt for _txt in [_pub_title, _event_title]):
            _region = "domestic"
        # 2. Check for explicit "International" keyword in venue
        elif any("국제" in _txt for _txt in [_pub_title, _event_title]):
            _region = "international"
        # 3. Fallback: Check for any Korean characters
        else:
            _region = "domestic" if any(
                __Has_korean__(
                    _txt
                ) for _txt in [_title, _pub_title, _event_title]
            ) else "international"

        _item["category"] = f"{_region}-{pub_type}"

        # Extract Year
        _year = 0
        if "issued" in _item and "date-parts" in _item["issued"]:
            try:
                _year = int(_item["issued"]["date-parts"][0][0])
            except (IndexError, ValueError, TypeError):
                pass
        _item["year"] = _year

        # Set Venue
        _item["venue"] = _pub_title if _pub_title else _event_title

        # Format Author
        if isinstance(_item.get("author"), list):
            _item["author"] = __Author_parser__(_item["author"])

        # Normalize DOI
        if "DOI" in _item:
            _item["doi"] = _item["DOI"]

        _processed.append(_item)
    return _processed

if __name__ == "__main__":
    _data_root = Path("./src/data/publication")

    # 1. Load and process both datasets
    _processed_data = [
        __Get_data_from__(
            _data_root, _pub_type
        ) for _pub_type in ["journal", "conference"]
    ]

    # 2. Merge
    _all_pub: list[dict] = list(chain(*_processed_data))

    # 3. Sort by year (descending)
    _all_pub.sort(key=lambda x: x.get("year", 0), reverse=True)

    # 4. Save to merged JSON file
    _write_file = _data_root / "publications.json"
    with _write_file.open("w", encoding="UTF-8") as f:
        json.dump(_all_pub, f, indent=4, ensure_ascii=False)

    print(f"Successfully merged {len(_all_pub)} items into {_write_file}")
