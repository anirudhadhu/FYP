import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);   // Accessing user context
  const [isOpen, setIsOpen] = useState(false);    // State for dropdown menu
  const dropdownRef = useRef(null);   // Ref for dropdown menu

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFavoriteClick = () => {
    console.log("Favorites clicked");
    setIsOpen(false);
  };

  // Function to handle click outside dropdown menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Effect to add event listener for clicking outside dropdown menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="p-5 flex justify-between bg-primary text-white sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <Link to={"/"} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span className="font-bold text-xl">TravelMate</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 py-2 px-4">

        {/* Hamburger menu for mobile */}
        <div className="flex rounded-full py-2 px-8 lg:hidden">
          <button
            className="bg-primary text-white p-1 rounded-full focus:outline-none "
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex rounded-full py-2 px-8">
          <ul className="flex space-x-16">
            <li>
              {" "}
              <Link to={"/"}>Home</Link>{" "}
            </li>
            <li>
              <Link to={"/AboutUs"}>About Us</Link>
            </li>
            <li>
              {" "}
              <Link to={"/favorites"}>Favorites</Link>
            </li>

            <li>
              <Link to={"/weather"}>Weather</Link>
            </li>
            <li>
              <Link to={"/news"}>News</Link>
            </li>
            {/* <li>
              <Link to={"/Contact"}>Contact</Link>
            </li> */}
          </ul>
        </div>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          {isOpen && (
            <div className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-primary bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Link
                  to={"/"}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  Home
                </Link>
              </div>
              <div className="py-1">
                <Link
                  to={"/AboutUs"}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  About Us
                </Link>
              </div>
              <div className="py-1">
                <Link
                  to={"/favorites"}
                  onClick={handleFavoriteClick}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  Favorites
                </Link>
              </div>

              <div className="py-1">
                <Link
                  to={"/weather"}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  Weather
                </Link>
              </div>
              <div className="py-1">
                <Link
                  to={"/news"}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  News
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Link to Account or Login page */}
        <Link
          to={user ? "/Account" : "/login"}
          className="bg-gray-500 text-white rounded-full border-primary-500 overflow-hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="bg-primary w-9 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
         {/* Display user's name if logged in */}
        <div className="text-sm font-medium truncate w-18">
          {!!user && <p>{user.name}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
