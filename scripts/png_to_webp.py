from pathlib import Path
from PIL import Image, ImageOps
import shutil
import subprocess

# Increase PIL limit for large images (e.g. panos)
Image.MAX_IMAGE_PIXELS = None 

# MAX SIZE CONSTANT (QHD Width)
_max_dimension = 2560

# constant
_img_dir = "src/assets"
_img_quality = 100

# Check for ffmpeg capability
_has_ffmpeg = shutil.which("ffmpeg") is not None

# code
_files_list: list[Path] = []
# Recursively find images and videos
for _ext in ["*.png", "*.jpg", "*.jpeg", "*.mp4"]:
    _files_list.extend(Path(_img_dir).rglob(_ext))

print(f"Found {len(_files_list)} files candidates.")

if not _has_ffmpeg:
    print("Notice: 'ffmpeg' not found. MP4 videos will be kept as-is (no conversion).")

for _file in _files_list:
    try:
        # Exclusion Logic
        if "favicon" in _file.parts:
            continue

        # Image Conversion
        if _file.suffix.lower() in [".png", ".jpg", ".jpeg"]:
            _target_file = _file.with_suffix(".webp")
            
            # Open Image
            _img = Image.open(_file)
            
            # Fix EXIF Orientation (Auto-rotate)
            _img = ImageOps.exif_transpose(_img)

            # Resize Logic
            _width, _height = _img.size
            if _width > _max_dimension or _height > _max_dimension:
                # Calculate new size maintaining aspect ratio
                if _width > _height:
                     new_width = _max_dimension
                     new_height = int(_height * (_max_dimension / _width))
                else:
                     new_height = _max_dimension
                     new_width = int(_width * (_max_dimension / _height))
                
                # High-quality resize
                _img = _img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"Resizing: {_file.name} ({_width}x{_height} -> {new_width}x{new_height})")
            
            # Save as WebP
            _img.save(_target_file, "webp", quality=_img_quality)
            print(f"Converted & Optimized: {_file.name} -> {_target_file.name}")
            
        # Video Conversion
        elif _file.suffix.lower() == ".mp4":
            if _has_ffmpeg:
                _target_file = _file.with_suffix(".webm")
                if _target_file.exists(): 
                     continue
                
                cmd = [
                    "ffmpeg", "-y", "-i", str(_file),
                    "-c:v", "libvpx-vp9", "-crf", "35", "-b:v", "0", 
                    "-c:a", "libopus", str(_target_file)
                ]
                result = subprocess.run(cmd, capture_output=True, text=True)
                if result.returncode == 0:
                    print(f"Converted Video: {_file.name} -> {_target_file.name}")
                else:
                    print(f"FFmpeg Error for {_file.name}: {result.stderr}")
            else:
                pass

    except Exception as e:
        print(f"Error processing {_file}: {e}")
