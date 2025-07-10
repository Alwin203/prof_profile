import React from "react";
import Image from "next/image";

const imageList = [
  { src: "/images/client works/health camp happy dog.png", alt: "Image 1" },
  {
    src: "/images/client works/panchakanya happy dashain.webp",
    alt: "Project 2",
  },
  { src: "/images/client works/losar.webp", alt: "Project 3" },
  { src: "/images/client works/nabin.webp", alt: "Project 4" },
  { src: "/images/client works/savedogs.png", alt: "project 5" },
  { src: "/images/movie posters/rockstar.webp", alt: "Project 6" },
  { src: "/images/client works/nepal furn sofa.png", alt: "Image 7" },
  { src: "/images/personal projects/tesla 0.5@0.5x.webp", alt: "image 8" },
  { src: "/images/client works/ronit fashions.png", alt: "image 9" },
  { src: "/images/music albums/suja mr p cover.png", alt: "image 11" },
  { src: "/images/client works/again bean bags.png", alt: "image 12" },
  { src: "/images/movie posters/gajni.webp", alt: "image 13" },
  { src: "/images/personal projects/honeysingh.webp", alt: "image 14" },
  { src: "/images/movie posters/kaminye.webp", alt: "image 15" },
];

const ProjectsSample = () => {
  return (
    <div className="text-center ">
      {/* <h1 className="text-2xl text-white mb-5">Work Samples</h1> */}
      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-2 gap-3">
        {imageList.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            loading="lazy"
            alt={image.alt}
            className="h-auto mb-3"
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSample;
