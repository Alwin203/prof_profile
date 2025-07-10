
'use client'
import React, { useState } from 'react'
import ImageUpload from "@/app/components/ImageUpload"
import Image from 'next/image'
import Link from 'next/link'

interface UploadedImage {
    path: string
    category: string
}

const UploadPage: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (password === process.env.NEXT_PUBLIC_UPLOAD_PAGE_PASSWORD) {
            setIsAuthenticated(true)
            setError('')
        } else {
            setError('Incorrect password')
        }
    }

    interface UploadResponse {
        uploadedFiles: string[];
        category: string;
    }
    
    const handleUploadSuccess = (response: UploadResponse) => {
        const newImages = response.uploadedFiles.map((path: string) => ({
            path,
            category: response.category
        }))
        setUploadedImages(prev => [...prev, ...newImages])
        if (!categories.includes(response.category)) {
            setCategories(prev => [...prev, response.category])
        }
    }

    const handleUploadError = (error: string) => {
        console.error('Upload error:', error)
    }

    const clearUploadedImages = () => {
        setUploadedImages([])
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#c7d2fe] flex items-center justify-center">
                <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-md w-full border border-indigo-100">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-700 text-transparent bg-clip-text mb-2">
                            Authentication Required
                        </h1>
                        <p className="text-gray-600">Enter the password to access the upload page</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 text-gray-500  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter password"
                                required
                            />
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg shadow hover:scale-[1.02] transition-transform font-semibold"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#c7d2fe] py-12">
                       <div className="container mx-auto px-4 max-w-6xl">
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-pink-500 font-semibold text-base mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-700 text-transparent bg-clip-text mb-4 drop-shadow-xl tracking-tight">
                        Alwin da Great.
                    </h1>
                    <p className="text-lg text-gray-700 font-medium">
                        Upload, organize, and showcase your creative work in style.
                    </p>
                </div>
                
                {/* Upload Component */}
                <div className="mx-auto max-w-2xl bg-white/80 rounded-2xl shadow-xl p-8 mb-14 border border-indigo-100 backdrop-blur">
                    <ImageUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={handleUploadError}
                    />
                </div>
                
                {/* Display Uploaded Images */}
                {uploadedImages.length > 0 && (
                    <div className="mt-16">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                <span className="inline-block w-2 h-8 bg-gradient-to-b from-indigo-400 to-pink-400 rounded-full mr-2"></span>
                                Recently Uploaded Images
                                <span className="ml-2 text-base font-semibold text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full">
                                    {uploadedImages.length}
                                </span>
                            </h2>
                            <button
                                onClick={clearUploadedImages}
                                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg shadow hover:scale-105 transition-transform font-semibold"
                            >
                                Clear All
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                            {uploadedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-white/90 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 hover:shadow-2xl transition-shadow group"
                                >
                                    <div className="relative w-full h-56 bg-gradient-to-br from-indigo-100 to-pink-100">
                                        <Image
                                            src={image.path}
                                            alt={`Uploaded ${index + 1}`}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <span className="inline-block bg-gradient-to-r from-indigo-200 to-pink-200 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm mb-2">
                                            {image.category}
                                        </span>
                                        <p className="text-xs text-gray-500 truncate font-mono">
                                            {image.path}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Instructions */}
                <div className="mt-20 bg-white/90 rounded-2xl shadow-xl p-10 border border-indigo-100 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        How to Use
                    </h3>
                    <ol className="space-y-4 text-gray-700 font-medium list-decimal list-inside">
                        <li>
                            <span className="font-semibold text-indigo-600">Enter a category name</span> or select from existing categories.
                        </li>
                        <li>
                            <span className="font-semibold text-indigo-600">Select multiple images</span> using the file input.
                        </li>
                        <li>
                            <span className="font-semibold text-indigo-600">Preview your selected images</span> and remove any unwanted ones.
                        </li>
                        <li>
                            <span className="font-semibold text-indigo-600">Click &quot;Upload&quot;</span> to save images to the selected category.
                        </li>
                    </ol>
                    
                    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></svg>
                            File Structure:
                        </h4>
                        <pre className="text-sm text-gray-600 font-mono bg-white/70 rounded p-3 overflow-x-auto">
{`public/
├── category1/
│   ├── image1.jpg
│   └── image2.png
├── category2/
│   └── image3.jpg
└── ...`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage
