import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/clientwork", text: "Client Works" },
  { href: "/clothes", text: "Clothing" },
  { href: "/music", text: "Album Covers" },
  { href: "/personal", text: "Personal Designs" },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="w-full md:w-1/5 flex-col items-center justify-center m-5 hidden md:flex">
      <ul className="text-center flex flex-col">
        {/* Conditionally render Home link */}
        {pathname !== "/" && (
          <li className="my-3">
            <Link
              href="/"
              className="block text-md p-5 text-white hover:bg-gray-200 hover:text-gray-900 transition duration-300 rounded-md"
            >
              Home
            </Link>
          </li>
        )}

        {/* Map through links, skipping the current page */}
        {links.map((link, index) => {
          if (pathname === link.href) {
            return null; // Skip rendering for the active page
          }

          return (
            <li key={index} className="my-3">
              <Link
                href={link.href}
                className="block text-md p-5 text-white hover:bg-gray-200 hover:text-gray-900 transition duration-300 rounded-md"
              >
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;