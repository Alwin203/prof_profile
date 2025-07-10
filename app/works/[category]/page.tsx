
'use client'
import React, { useState, useEffect } from 'react'
import NewSidebar from '@/app/components/NewSidebar'
import Image from 'next/image'
import Link from 'next/link'

// Replace your fetchImages function with this:
import { fetchImagesAction } from '@/lib/actions'

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = React.use(params);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  
  useEffect(() => {
    fetchImagesAction(category).then(setImages)
  }, [category])

    return (
        <div className="flex min-h-screen">
            <NewSidebar />
            <main className="flex-1 md:ml-[24vw] bg-zinc-900">
                <div className="sticky top-0 bg-zinc-900 z-10 py-4 px-6">
                    <div className="flex items-center">
                        <Link href="/" className="text-yellow-400 hover:text-yellow-300 mr-4">
                            ← Back
                        </Link>
                        <h1 className="text-3xl font-bold text-yellow-400 capitalize">
                            {category.replace('%20', " ")}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col">
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className="w-full h-screen relative mb-3" // Changed to relative and fixed height
                        >
                            <button
                                className="absolute inset-0 w-full h-full focus:outline-none"
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image}
                                    alt={`${category} ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    quality={100}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                        style={{ pointerEvents: 'auto' }} // Ensure pointer events are enabled
                    >
                        <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '100vh' }}>
                            <button
                                className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition"
                                onClick={() => setSelectedImage(null)}
                                aria-label="Close"
                                type="button"
                                style={{ zIndex: 10 }}
                            >
                                ×
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                fill
                                style={{ objectFit: 'contain' }}
                                className="p-4"
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}