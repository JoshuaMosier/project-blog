from PIL import Image
import os

def optimize_images(input_folder, output_folder, max_width=1920):
    """
    Resize and optimize images for web use.
    - Maintains aspect ratio
    - Reduces quality to 85% (good balance between quality and file size)
    - Strips EXIF data to further reduce size
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.jpg', '.jpeg','.JPG','.JPEG')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            
            with Image.open(input_path) as img:
                # Calculate new height maintaining aspect ratio
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                
                # Resize image
                resized = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Save optimized image
                resized.save(
                    output_path,
                    'JPEG',
                    quality=85,
                    optimize=True,
                    progressive=True
                )
                
                print(f"Processed: {filename}")

# Example usage
input_folder = "static/posts/ghost-banshee/banshee/opt"
output_folder = "static/posts/ghost-banshee/banshee/opt2"
optimize_images(input_folder, output_folder)