// "use client";
// // import Sidebar from "./components/Sidebar";
// // import MainContent from "./components/MainContent";
// // import Footer from "./components/Footer";
// import ProjectsSample from "./components/ProjectsSample";
// // import Hamberger from "./components/Hamberger";
// import NewSidebar from "./components/NewSidebar";

// const Home = () => {
//   return (
//     <>
//       <div className="flex md:flex-row flex-col min-h-screen md:pl-[24vw] mt-[17vh] bg-black  ">
//         <NewSidebar />
//         <ProjectsSample />
//       </div>
//     </>
//   );
// };

// export default Home;
// app/page.tsx
import React from 'react';
import NewSidebar from './components/NewSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategoriesAction } from '@/lib/actions';

const fetchCategories = async () => {
  try {
    const response = await fetchCategoriesAction()
    return response
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blac">
      <NewSidebar />
      
      <main className="flex-1 md:ml-[24vw] p-8 min-h-screen">
        <div className="mb-12">
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: string) => (
            <Link 
              href={`/works/${category}`} 
              key={category}
              className="group relative overflow-hidden rounded-2xl transition-all duratison-700 hover:scale-[1.02]"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Category image */}
                <div className="relative aspect-[4/3] w-full">
                <Image
                  src={`/${category}/main.webp`}
                  alt={category}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  quality={90}
                />
                </div>
              
              {/* Category title */}
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-2xl font-bold text-white capitalize font-display">
                    {category.replace(/-/g, ' ')}
                  </h2>
                  <p className="text-zinc-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View project →
                  </p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </Link>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Alwin Bhandari. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}