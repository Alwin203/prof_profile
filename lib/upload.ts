// lib/upload.ts
import fs from "node:fs/promises"
import path from "node:path"

// Simple upload function that works with FormData
export const uploadImages = async (
  files: Array<{ originalname: string; buffer: Buffer }>, 
  category: string
): Promise<string[]> => {
  const publicDir = path.join(process.cwd(), "public")
  const sanitizedCategory = category.replace(/[^a-zA-Z0-9_-]/g, '_')
  const categoryDir = path.join(publicDir, sanitizedCategory)
  
  // Create category directory if it doesn't exist
  try {
    await fs.mkdir(categoryDir, { recursive: true })
  } catch (err) {
    console.error('Directory creation error:', err)
    throw new Error(`Failed to create directory: ${err}`)
  }

  const uploadPromises = files.map(async (file) => {
    // Generate unique filename to prevent conflicts
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 8)
    const fileExtension = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, fileExtension)
    const fileName = `${baseName}_${timestamp}_${randomSuffix}${fileExtension}`
    const filePath = path.join(categoryDir, fileName)
    
    try {
      await fs.writeFile(filePath, file.buffer)
      // Return relative path for frontend use
      return `/${sanitizedCategory}/${fileName}`
    } catch (err) {
      console.error('File write error:', err)
      throw new Error(`Failed to upload ${file.originalname}: ${err}`)
    }
  })

  try {
    const uploadedPaths = await Promise.all(uploadPromises)
    return uploadedPaths
  } catch (err) {
    throw new Error(`Failed to upload images: ${err}`)
  }
}

// Single file upload (keeping your original function enhanced)
export const uploadImage = async (
  file: { originalname: string; buffer: Buffer }, 
  category: string
): Promise<string> => {
  const result = await uploadImages([file], category)
  return result[0]
}

// Utility function to get all categories
export const getCategories = async (): Promise<string[]> => {
  const publicDir = path.join(process.cwd(), "public")
  
  try {
    const entries = await fs.readdir(publicDir, { withFileTypes: true })
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.')) // Exclude hidden directories
  } catch (err) {
    console.error('Error reading categories:', err)
    return []
  }
}


// upload images: 
export const uploadImagesClientSide = async (
  files: File[],
  category: string
): Promise<string[]> => {
  // In browser environment, we'll return blob URLs instead of file paths
  // since we can't write to filesystem directly from the browser
  
  const sanitizedCategory = category.replace(/[^a-zA-Z0-9_-]/g, '_');
  
  // Generate URLs for the uploaded files (simulating server behavior)
  const uploadedUrls = files.map(file => {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop() || '';
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const fileName = `${baseName}_${timestamp}_${randomSuffix}.${fileExtension}`;
    
    // Return a blob URL representing the "uploaded" file
    return {
      url: URL.createObjectURL(file),
      fileName: `/${sanitizedCategory}/${fileName}` // simulated path
    };
  });

  // Return just the simulated paths
  return uploadedUrls.map(u => u.fileName);
};
