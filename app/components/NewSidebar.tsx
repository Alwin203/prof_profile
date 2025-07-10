"use client"

// components/NewSidebar.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { AiFillBehanceCircle } from "react-icons/ai";

const NewSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<{name: string, path: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/upload');
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories.map((category: string) => ({
            name: category,
            path: `/works/${category}`
          })));
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 md:h-screen w-full md:w-[24vw] flex flex-col items-center px-6 md:px-8 bg-black text-white z-50 border-r border-zinc-800">
      <div className="flex md:flex-col flex-row justify-between items-center w-full py-6">
        <Link href="/">
          <div className="flex flex-col group items-center">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-yellow-500/20 group-hover:border-yellow-500 transition-all duration-500">
              <Image
                src="/images/home.webp"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-center text-white mt-4 group-hover:text-yellow-500 transition-all duration-300 cursor-pointer hidden md:block font-display">
              Alwin Bhandari
            </h1>
          </div>
        </Link>
        
        <div className="gap-4 mb-6 mt-6 justify-center hidden md:flex">
          <Link href="https://www.linkedin.com/in/alwin-bhandari-5430262b0/" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <FaLinkedin className="text-xl" />
          </Link>
          <Link href="mailto:alwinbhandari203@gmail.com" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <FaEnvelope className="text-xl" />
          </Link>
          <Link href="https://www.behance.net/alwindagreat" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <AiFillBehanceCircle className="text-xl" />
          </Link>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-yellow-500 text-2xl bg-black/50 p-2 rounded-lg"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`flex flex-col w-full ${isOpen ? "block" : "hidden"} md:block`}>
        <div className="flex gap-4 mb-6 md:hidden">
          <Link href="https://www.linkedin.com/in/alwin-bhandari-5430262b0/" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <FaLinkedin className="text-xl" />
          </Link>
          <Link href="mailto:alwinbhandari203@gmail.com" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <FaEnvelope className="text-xl" />
          </Link>
          <Link href="https://www.behance.net/alwindagreat" className="text-zinc-400 hover:text-yellow-500 transition-all duration-300">
            <AiFillBehanceCircle className="text-xl" />
          </Link>
        </div>
        
        <div className="w-full">
          <h2 className="font-bold text-lg text-yellow-500 mb-4 pb-2 border-b border-zinc-800 font-display">WORK</h2>
          <div className="space-y-2">
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 bg-zinc-800 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <Link href={category.path} key={category.name}>
                  <div className="text-zinc-300 hover:text-yellow-500 transition-all duration-300 cursor-pointer py-2 px-1 rounded-md group flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="capitalize">{category.name.replace(/-/g, ' ')}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;