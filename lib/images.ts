// lib/images.ts
import { readdir, access } from "node:fs/promises"
import path from "path"

export const getImages = async (category: string): Promise<string[]> => {
  if (!category) {
    throw new Error('Category parameter is required')
  }
  
  try {


    const publicPath = path.join(process.cwd(), 'public', category)
    
    // Check if directory exists using fs/promises
    try {
      await access(publicPath)
    } catch {
      // Directory doesn't exist, return empty array
      return []
    }
    
    // Read directory contents asynchronously
    const files = await readdir(publicPath)
    
    // Filter out non-image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
    })
    
    return imageFiles.map(file => `/${category}/${file}`)
  } catch (error) {
    console.error('Failed to fetch images:', error)
    return []
  }
}