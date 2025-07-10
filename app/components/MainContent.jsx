import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { AiFillBehanceCircle } from "react-icons/ai";

const MainContent = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full md:w-3/5">
      hello
      <Image
        src="/images/main.webp"
        alt="Character"
        priority
        className="w-3/4 transform transition duration-500 hover:scale-110"
        width={500}
        height={500}
      />
      <h1 className="mt-5 text-3xl p-1 text-white transition duration-300 hover:bg-gray-200 hover:text-gray-900 rounded">
        Alwin Bhandari
      </h1>
      <p className="mt-5 text-white">Graphic Designer</p>
      <div className="flex justify-center mt-5 items-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:alwinbhandari203@gmail.com"
          className="mx-4"
        >
          <FaEnvelope className="text-white" size={30} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/alwin-bhandari-5430262b0/"
          className="mx-4"
        >
          <FaLinkedin className="text-white" size={30} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Alwin203"
          className="mx-4"
        >
          <FaGithub className="text-white" size={30} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.behance.net/alwindagreat"
          className="mx-4"
        >
          <AiFillBehanceCircle className="text-white" size={30} />
        </a>
      </div>
    </div>
  );
};

export default MainContent;
