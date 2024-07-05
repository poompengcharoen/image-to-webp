import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Function to recursively read directories
const walkDir = (dir, callback) => {
	fs.readdirSync(dir).forEach((f) => {
		const dirPath = path.join(dir, f)
		const isDirectory = fs.statSync(dirPath).isDirectory()
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
	})
}

// Function to convert and optimize images in-place
const convertImagesToWebP = (inputPath) => {
	// Walk through the directory
	walkDir(inputPath, (filePath) => {
		const extension = path.extname(filePath).toLowerCase()

		// Process only JPG, JPEG, PNG, and WebP files
		if (
			extension === '.jpg' ||
			extension === '.jpeg' ||
			extension === '.png' ||
			extension === '.webp'
		) {
			const fileName = path.basename(filePath, extension)
			const outputFilePath = path.join(
				path.dirname(filePath),
				`${fileName}.webp`
			)

			// Check if the file is already in WebP format
			if (extension === '.webp') {
				// Skip optimization if input and output paths are the same
				if (filePath === outputFilePath) {
					console.log(`Skipping optimization of ${filePath} (already WebP)`)
					return
				}

				// Optimize existing WebP file in lossless mode
				sharp(filePath)
					.webp({ lossless: true }) // Optimize in lossless mode
					.toFile(outputFilePath, (err, info) => {
						if (err) {
							console.error(`Error optimizing ${filePath} as WebP:`, err)
						} else {
							console.log(`Optimized ${filePath} as ${info.format} format`)
							// Optionally, you can remove the original file after optimization
							fs.unlinkSync(filePath)
							console.log(`Removed original file: ${filePath}`)
						}
					})
			} else {
				// Convert and optimize image to WebP in lossless mode
				sharp(filePath)
					.webp({ lossless: true }) // Optimize in lossless mode
					.toFile(outputFilePath, (err, info) => {
						if (err) {
							console.error(`Error converting ${filePath} to WebP:`, err)
						} else {
							console.log(`Converted ${filePath} to ${info.format} format`)

							// Optionally, you can remove the original file after conversion
							fs.unlinkSync(filePath)
							console.log(`Removed original file: ${filePath}`)
						}
					})
			}
		}
	})
}

// Function to handle command line arguments
const handleCommandLineArgs = () => {
	// Retrieve command line arguments
	const args = process.argv.slice(2)

	// Check if at least one argument (folder path) is provided
	if (args.length < 1) {
		console.error('Please provide a folder path as an argument.')
		return
	}

	// Use the first argument as the input folder path
	const inputFolder = args[0]

	// Start converting images in the specified folder
	convertImagesToWebP(inputFolder)
}

// Call the function to handle command line arguments
handleCommandLineArgs()
