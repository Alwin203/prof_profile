// lib/actions.ts
'use server'
import { getImages } from './images'
import { getCategories } from './upload'
import { uploadImages } from '@/lib/upload'

export async function fetchImagesAction(category: string) {
  return await getImages(category)
}

export async function fetchCategoriesAction() {
  return await getCategories()
}



export const uploadImagesAction = async (formData: FormData) => {
  const category = formData.get('category') as string
  const files = formData.getAll('images') as File[]
  
  if (!category) throw new Error('Category is required')
  if (files.length === 0) throw new Error('No files provided')

  const buffers = await Promise.all(
    files.map(async (file) => ({
      originalname: file.name,
      buffer: Buffer.from(await file.arrayBuffer())
    }))
  )

  return uploadImages(buffers, category)
}