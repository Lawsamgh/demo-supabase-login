import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { session, signOut } = UserAuth(); // Get session and signOut from context
  const userEmail = session?.user?.email; // Safely access user email

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close mobile menu and dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      const dropdownMenu = document.getElementById("dropdown-menu");

      if (
        mobileMenu &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuButton.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }

      if (dropdownMenu && !dropdownMenu.contains(e.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-amd"
              viewBox="0 0 16 16"
            >
              <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z" />
            </svg>
            <span className="ml-2 text-xl font-lighter text-gray-800">
              Lawsam GH
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {userEmail ? (
              <>
                <span className="flex items-center text-gray-600">
                  <img
                    alt=""
                    src="src/assets/user-profile.png"
                    className="inline-block size-8 rounded-full ring-2 ring-white mr-2"
                  />

                  {userEmail}
                </span>
                <button
                  onClick={signOut}
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Sign out
                </button>
              </>
            ) : (
              <span className="text-gray-600">Not logged in</span>
            )}
          </div>

          <button
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="bg-white w-full py-2 p-4 flex justify-between items-center"
        >
          {userEmail ? (
            <>
              <div className="flex items-center">
                <img
                  alt=""
                  src="src/assets/user-profile.png"
                  className="inline-block size-8 rounded-full ring-2 ring-white mr-2"
                />
                <span className="text-gray-600">{userEmail}</span>
              </div>
              <button
                onClick={signOut}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-auto"
              >
                Sign out
              </button>
            </>
          ) : (
            <span className="text-gray-600">Not logged in</span>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
