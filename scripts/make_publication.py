from itertools import chain
import json
import re
from pathlib import Path
import glob

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

def __Process_Zotero_Item__(item: dict) -> dict:
    """Extracts core metadata from a Zotero CSL JSON item."""
    processed = {"id": item.get("id")}
    
    # 1. Type & Category
    _raw_type = item.get("type", "")
    if _raw_type in ["article-journal", "article"]:
        pub_type = "journal"
    elif _raw_type in ["paper-conference", "conference"]:
        pub_type = "conference"
    else:
        return None # Skip unknown types

    _title = item.get("title", "")
    _pub_title = item.get("container-title", "")
    _event_title = item.get("event-title", "")

    # Category Logic (Domestic vs International)
    if any("국내" in _txt for _txt in [_pub_title, _event_title]):
        _region = "domestic"
    elif any("국제" in _txt for _txt in [_pub_title, _event_title]):
        _region = "international"
    else:
        _region = "domestic" if any(__Has_korean__(_txt) for _txt in [_title, _pub_title, _event_title]) else "international"
    
    processed["category"] = f"{_region}-{pub_type}"
    processed["title"] = _title
    
    # Year
    _year = 0
    if "issued" in item and "date-parts" in item["issued"]:
        try:
            if item["issued"]["date-parts"] and item["issued"]["date-parts"][0]:
                _year = int(item["issued"]["date-parts"][0][0])
        except (IndexError, ValueError, TypeError):
            pass
    processed["year"] = _year

    # Venue
    _venue = _pub_title if _pub_title else _event_title
    if not _venue and "publisher" in item:
        _venue = item["publisher"]
    processed["venue"] = _venue

    # Author
    if isinstance(item.get("author"), list):
        processed["author"] = __Author_parser__(item["author"])
    else:
        processed["author"] = item.get("author", "")

    # DOI / URL
    if "DOI" in item:
        processed["doi"] = item["DOI"]
    if "URL" in item:
        processed["URL"] = item["URL"]

    # Initial Abstract (only if creating new)
    if "abstract" in item:
        processed["abstract"] = item["abstract"]

    return processed

if __name__ == "__main__":
    _source_file = Path("./src/data/My Library.json")
    _projects_dir = Path("./src/data/projects")
    
    # Ensure projects directory exists
    if not _projects_dir.exists():
        _projects_dir.mkdir(parents=True, exist_ok=True)

    # 1. Load Zotero Data
    if not _source_file.exists():
        print(f"Warning: {_source_file} not found. Skipping Zotero sync.")
        exit(0)

    with _source_file.open("r", encoding="UTF-8") as _f:
        try:
            _zotero_data = json.load(_f)
        except json.JSONDecodeError:
            print("Error: Failed to decode My Library.json")
            exit(1)

    # 2. Build Map of Existing Files: ID -> FilePath
    _existing_map = {}
    for _file_path in _projects_dir.glob("*.json"):
        try:
            with _file_path.open("r", encoding="UTF-8") as _f:
                _data = json.load(_f)
                if "id" in _data:
                    _existing_map[_data["id"]] = _file_path
        except Exception as e:
            print(f"Warning: Could not read {_file_path}: {e}")

    # 3. Process Each Zotero Item
    _count_updated = 0
    _count_created = 0

    for _z_item in _zotero_data:
        _core_data = __Process_Zotero_Item__(_z_item)
        if not _core_data:
            continue

        _id = _core_data["id"]
        
        if _id in _existing_map:
            # UPDATE EXISTING
            _target_path = _existing_map[_id]
            
            # Load current file content to preserve manual edits
            with _target_path.open("r", encoding="UTF-8") as _f:
                _current_file_data = json.load(_f)
            
            # Merge: Update strict metadata, Preserve everything else
            # Core fields to update from Zotero:
            _fields_to_sync = ["title", "year", "venue", "category", "doi", "URL", "author"]
            
            for _field in _fields_to_sync:
                if _field in _core_data:
                    _current_file_data[_field] = _core_data[_field]
            
            # Special case: Abstract
            # If abstract is missing in file, add it. If it exists, KEEP IT (manual edit assumed).
            if "abstract" not in _current_file_data and "abstract" in _core_data:
                _current_file_data["abstract"] = _core_data["abstract"]

            # Save
            with _target_path.open("w", encoding="UTF-8") as _f:
                json.dump(_current_file_data, _f, indent=4, ensure_ascii=False)
            _count_updated += 1

        else:
            # CREATE NEW
            _sanitized_id = _id.replace("/", "_").replace("\\", "_")
            _filename = f"{_sanitized_id}.json"
            _target_path = _projects_dir / _filename
            
            with _target_path.open("w", encoding="UTF-8") as _f:
                json.dump(_core_data, _f, indent=4, ensure_ascii=False)
            _count_created += 1

    print(f"Sync Complete. Updated: {_count_updated}, Created: {_count_created}")
