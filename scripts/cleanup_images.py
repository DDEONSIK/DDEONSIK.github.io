from pathlib import Path
import os

# Target directory
_img_dir = "src/assets"

# Extensions to check for deletion
_delete_exts = [".jpg", ".jpeg", ".png"]

print(f"Scanning {_img_dir} for legacy images...")
print("Safety Policy: Delete ONLY if a corresponding .webp file exists.")

deleted_count = 0
skipped_count = 0

# Recursively find candidates
candidates = []
for ext in _delete_exts:
    candidates.extend(Path(_img_dir).rglob(f"*{ext}"))

for file_path in candidates:
    # 1. Favicon Safety Check
    if "favicon" in file_path.parts:
        # print(f"Skipping (Favicon): {file_path.name}")
        continue
    
    # 2. Check for existence of corresponding .webp
    # e.g. "image.jpg" -> check for "image.webp"
    webp_path = file_path.with_suffix(".webp")
    
    if webp_path.exists():
        try:
            os.remove(file_path)
            print(f"Verified & Deleted: {file_path.name} (Found {webp_path.name})")
            deleted_count += 1
        except Exception as e:
            print(f"Error deleting {file_path.name}: {e}")
    else:
        print(f"SKIPPED (No WebP found): {file_path.name}")
        skipped_count += 1

print("-" * 30)
print(f"Cleanup Complete.")
print(f"Deleted: {deleted_count} files")
print(f"Skipped: {skipped_count} files (No WebP counterpart or excluded)")
