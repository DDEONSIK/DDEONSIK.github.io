from pathlib import Path
from PIL import Image

# constant
# _img_dir = "src/assets/people/students"
# _img_dir = "src/assets/people/professor"
_img_dir = "src/assets/people"
_img_quality = 100

# code
_img_list: list[Path] = []
for _ext in ["*.png", "*.jpg"]:
    _img_list.extend(Path(_img_dir).glob(_ext))

for _img_file in _img_list:
    _img = Image.open(_img_file)

    _img.save(
        _img_file.with_suffix(".webp"), "webp", quality=_img_quality)
