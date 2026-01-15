from pathlib import Path
from PIL import Image
import shutil

# Increase PIL limit for large images
Image.MAX_IMAGE_PIXELS = None 

# MAX SIZE CONSTANT (QHD Width)
_max_dimension = 2560
_img_quality = 100

_img_dir = "src/assets"

print(f"Scanning {_img_dir} for WebP images to optimize...")

_files_list: list[Path] = []
# Only scan for existing webp files
_files_list.extend(Path(_img_dir).rglob("*.webp"))

print(f"Found {len(_files_list)} WebP files.")

optimized_count = 0

for _file in _files_list:
    try:
        if "favicon" in _file.parts:
            continue

        _img = Image.open(_file)
        # Fix Orientation (Safety check)
        from PIL import ImageOps
        _img = ImageOps.exif_transpose(_img)
        
        # Check dimensions
        _width, _height = _img.size
        
        # Optimization Logic: Resize if larger than max dimension
        if _width > _max_dimension or _height > _max_dimension:
            if _width > _height:
                    new_width = _max_dimension
                    new_height = int(_height * (_max_dimension / _width))
            else:
                    new_height = _max_dimension
                    new_width = int(_width * (_max_dimension / _height))
            
            # High-quality resize
            _img = _img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            _img.save(_file, "webp", quality=_img_quality)
            print(f"Optimized: {_file.name} ({_width}x{_height} -> {new_width}x{new_height})")
            optimized_count += 1
        else:
            # print(f"Skipped (Already optimal): {_file.name}")
            pass

    except Exception as e:
        print(f"Error processing {_file}: {e}")

print("-" * 30)
print(f"Optimization Complete. Optimized {optimized_count} images.")
