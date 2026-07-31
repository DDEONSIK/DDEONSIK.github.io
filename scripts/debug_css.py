import re

file_path = "c:/code/personal_website/docs/assets/index-8ARvngn4.css"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for Root definition
    root_secondary = re.search(r'--secondary:([^;}]+)', content)
    if root_secondary:
        print(f"ROOT --secondary: {root_secondary.group(1)}")
    else:
        print("ROOT --secondary NOT FOUND")

    # Check for Usage in bg-secondary
    bg_secondary = re.search(r'\.bg-secondary\{([^}]+)\}', content)
    if bg_secondary:
        print(f"CLASS .bg-secondary: {bg_secondary.group(1)}")
    else:
        # Maybe it's compiled differently, look for generic usage
        print("CLASS .bg-secondary pattern not found exactly")

except Exception as e:
    print(f"Error: {e}")
