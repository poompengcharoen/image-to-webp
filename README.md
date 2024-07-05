# Convert and Optimize Images

This Node.js script converts images in a specified directory to WebP format and optimizes them for web use. It utilizes the `sharp` library for image processing and supports recursive directory traversal.

## Requirements

- Node.js (version 12 or higher)
- Yarn (package manager)

## Installation

1. Clone the repository:

2. Navigate to the project directory:

   ```bash
   cd poom-image-to-webp
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Usage

To convert images in a specified folder to WebP format, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the project directory.

3. Run the script with the folder path containing images:

   ```bash
   yarn convert '/path/to/your/images'
   ```

   Replace `/path/to/your/images` with the actual path to your images.

4. The script will recursively convert all supported image files (JPG, JPEG, PNG, WebP) found in the specified folder to WebP format and optimize them in lossless mode.

5. Optionally, the original files will be removed after conversion and optimization.

## Notes

- Ensure you have permission to write to the specified folder and that the images are not critical or irreplaceable since the script deletes the original files after conversion.
- It's recommended to make a backup of your images before running the script.
