from pathlib import Path
from PIL import Image, ImageOps
import shutil
import subprocess

# Increase PIL limit for large images (e.g. panos)
Image.MAX_IMAGE_PIXELS = None 

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
            
            # Force re-conversion to fix rotation issues
            # if _target_file.exists():
            #     continue

            _img = Image.open(_file)
            
            # Fix EXIF Orientation (Auto-rotate)
            _img = ImageOps.exif_transpose(_img)
            
            _img.save(_target_file, "webp", quality=_img_quality)
            print(f"Converted Image (Fixed Orientation): {_file.name} -> {_target_file.name}")
            
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
