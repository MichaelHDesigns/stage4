import os

# Set the directory path where your image files are located
directory = '../images/pre-rolls'

# List all files in the directory
files = os.listdir(directory)

# Define the new base name for your files
new_base_name = 'image'

# Iterate through the files and rename them
for index, filename in enumerate(files):
    # Construct the new filename
    new_filename = f'{new_base_name}{index + 1}.jpg'  # You can adjust the file extension if needed
    
    # Create the full file paths
    old_path = os.path.join(directory, filename)
    new_path = os.path.join(directory, new_filename)
    
    # Rename the file
    os.rename(old_path, new_path)
    print(f'Renamed: {filename} -> {new_filename}')

print('File renaming complete.')
