import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-zinc-950 text-white py-4 text-center">
      <p>
        Made by&nbsp;
        <Link
          target="_blank" rel="noopener noreferrer"
          href="https://jynxnepal.vercel.app/"
          className="hover:text-[#dc2525] transition-all duration-100"
        >
          JYNX
        </Link>
      </p>
    </div>
  );
};

export default Footer;
