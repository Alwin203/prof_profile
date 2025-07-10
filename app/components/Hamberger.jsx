import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target) && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { href: "/clientwork", text: "Client Works" },
    { href: "/clothes", text: "Clothing" },
    { href: "/music", text: "Album Covers" },
    { href: "/personal", text: "Personal Designs" },
    // Add other menu items here
  ];

  return (
    <div className="relative bg-[#2c3e50] text-white font-['Press_Start_2P']">
      {/* Hamburger Icon (visible on mobile) */}
      <div className="md:hidden flex justify-between w-full p-3">
        <Link href={"/"} className="flex items-center">
          <h1 className="text-md">Alwin Bhandari</h1>
        </Link>
        <button className="text-white focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`${
          isOpen ? "flex" : "hidden"
        } fixed inset-0 bg-[#34495e] flex-col items-center justify-center z-50 transition-all duration-300`}
      >
        <button
          className="absolute top-4 right-4 text-white z-50"
          onClick={closeMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <ul className="text-center flex flex-col space-y-4 z-40">
          {/* Always show Home link, except on the homepage */}
          {pathname !== "/" && (
            <li>
              <Link
                href="/"
                className="block text-md p-5 hover:bg-gray-200 hover:text-gray-900 transition duration-300 rounded-md"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
          )}

          {/* Sidebar Links */}
          {menuItems.map(
            (item, index) =>
              pathname !== item.href && ( // Skip rendering for the active page
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block text-md p-5 hover:bg-gray-200 hover:text-gray-900 transition duration-300 rounded-md"
                    onClick={closeMenu}
                  >
                    {item.text}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
};

export default HamburgerMenu;
