'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchCategoriesAction, uploadImagesAction } from '@/lib/actions'

interface UploadResponse {
  success: boolean
  message: string
  uploadedFiles: string[]
  category: string
  error?: string
}

interface ImageUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void
  onUploadError?: (error: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [category, setCategory] = useState('')
  const [existingCategories, setExistingCategories] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Fetch existing categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchCategoriesAction()
        if (categories) {
          setExistingCategories(categories)
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])
// Generate previews when files change
useEffect(() => {
  // Clean up previous blobs
  const previousUrls = previewUrls; // Capture current value
  previousUrls.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  })

  const urls = selectedFiles
    .filter(file => file && file.size > 0)
    .map(file => URL.createObjectURL(file))

  setPreviewUrls(urls)

  // Cleanup on unmount
  return () => {
    urls.forEach(url => URL.revokeObjectURL(url))
  }
}, [selectedFiles, previewUrls]) // Added previewUrls to dependencies

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/')
      const isValidSize = file.size <= 10 * 1024 * 1024
      return isValidType && isValidSize
    })

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only image files under 10MB are allowed.')
    }

    setSelectedFiles(validFiles)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedFiles.length === 0) {
      alert('Please select at least one image')
      return
    }

    if (!category.trim()) {
      alert('Please enter a category name')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('category', category.trim())
      selectedFiles.forEach(file => formData.append('images', file))

      const uploadedPaths = await uploadImagesAction(formData)

      const result: UploadResponse = {
        success: true,
        message: `Successfully uploaded ${selectedFiles.length} image(s)`,
        uploadedFiles: uploadedPaths,
        category: category.trim()
      }

      if (result.success) {
        onUploadSuccess?.(result)
        alert(`Successfully uploaded ${result.uploadedFiles.length} image(s) to ${result.category}`)

        // Reset
        setSelectedFiles([])
        setCategory('')
        const refreshCategories = async () => {
          const res = await fetchCategoriesAction()
          if (res) setExistingCategories(res)
        }
        refreshCategories()
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed'
      onUploadError?.(message)
      alert(`Upload failed: ${message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Upload Images</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter category name"
            className="w-full p-3 border rounded-md text-black  focus:ring-2 focus:ring-blue-500"
            required
          />
          {existingCategories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Or choose existing:</span>
              {existingCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    cat === category
                      ? 'bg-blue-100 text-blue-700 border-blue-300'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  } transition`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* File Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Select Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">Multiple images allowed. Max 10MB each.</p>
        </div>

        {/* Preview Grid */}
        {previewUrls.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Selected Images ({selectedFiles.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                    priority
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                  <p className="mt-1 text-xs text-gray-600 text-center truncate px-2">
                    {selectedFiles[index]?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || selectedFiles.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold transition"
        >
          {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
        </button>
      </form>
    </div>
  )
}

export default ImageUpload
