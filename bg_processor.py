import os
from PIL import Image
from rembg import remove

# Source folder
src_folder = r"e:\For website\dspl website\src\assets"

files = [
    "manu.jpg",
    "sree.jpeg",
    "dr.png",
    "vice_chairman.jpg",
    "Anusha-mam.png",
    "ceo.png"
]

bg_color = (243, 244, 246, 255) # Clean light gray #f3f4f6

for f in files:
    input_path = os.path.join(src_folder, f)
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        continue
    
    print(f"Processing {f}...")
    
    # Open image
    try:
        input_image = Image.open(input_path).convert("RGBA")
        
        # Remove background
        cutout = remove(input_image)
        
        # Create solid background
        new_bg = Image.new("RGBA", cutout.size, bg_color)
        
        # Paste cutout onto background using its alpha as mask
        new_bg.paste(cutout, (0, 0), mask=cutout)
        
        # Convert back to RGB to save as jpg or keep as PNG
        final_img = new_bg.convert("RGB")
        
        # Output path
        name, _ = os.path.splitext(f)
        output_filename = f"{name}_pro.png"
        output_path = os.path.join(src_folder, output_filename)
        
        final_img.save(output_path, "PNG")
        print(f"Saved {output_path}")
        
    except Exception as e:
        print(f"Error processing {f}: {e}")

print("All done!")
