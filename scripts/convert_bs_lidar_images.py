from pathlib import Path
from PIL import Image
import os

def convert_to_webp(directory):
    dir_path = Path(directory)
    # Target specific files to avoid accident
    targets = [
        "BS_Lidar_Control_Fig_1.png",
        "BS_Lidar_Control_Fig_2.png",
        "BS_Lidar_Control_Fig_3.png"
    ]
    
    for filename in targets:
        file_path = dir_path / filename
        if file_path.exists():
            print(f"Converting {filename}...")
            try:
                with Image.open(file_path) as img:
                    # Save as WebP
                    new_path = file_path.with_suffix('.webp')
                    img.save(new_path, "WEBP", quality=85)
                    print(f"Saved {new_path.name}")
                
                # Delete original
                os.remove(file_path)
                print(f"Deleted {filename}")
            except Exception as e:
                print(f"Error converting {filename}: {e}")
        else:
            print(f"Skipping {filename} (Not found)")

if __name__ == "__main__":
    convert_to_webp("src/assets/project")
