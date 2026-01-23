from pathlib import Path
from PIL import Image
import os
import shutil

def swap_image():
    dir_path = Path("src/assets/project")
    source_png = dir_path / "BS_Lidar_Control_Fig_1_en.png"
    target_webp = dir_path / "BS_Lidar_Control_Fig_1.webp"
    
    if not source_png.exists():
        print(f"Error: Source file {source_png} not found.")
        return

    print(f"Converting {source_png.name} to WebP...")
    try:
        with Image.open(source_png) as img:
            # Save as WebP, overwriting the target
            img.save(target_webp, "WEBP", quality=85)
            print(f"Overwritten {target_webp.name}")
        
        # Delete source png
        os.remove(source_png)
        print(f"Deleted source {source_png.name}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    swap_image()
