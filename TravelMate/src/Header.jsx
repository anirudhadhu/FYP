import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFavoriteClick = () => {
    console.log("Favorites clicked");
  };

  return (
    <header className="p-6 flex justify-between">
      {/* --------------------for logo ----------------- */}
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
          // color="rgb(130, 0, 237)"
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
        <span className="font-bold  text-xl">TravelMate</span>
      </Link>

      {/* --------------------for search bar ----------------- */}
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div className="search-filter">Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div className="search-filter">Any week</div>
        <div className="border-l border-gray-300"></div>
        <div className="search-filter">Add guests</div>

        {/* ---------------------for button --------------------*/}
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* --------------------for user ----------------- */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
        {/* -----------------hamburger------------- */}
        <div className="relative inline-block text-left">
          <button
            className="bg-white focus:outline-none"
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
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-primary bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
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
                  to={"/contact"}
                  onClick={handleFavoriteClick}
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-primary hover:text-white rounded-2xl"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>

        {/*------------ user icon ----------*/}

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
        <div className="text-sm font-medium truncate w-18">
          {!!user && <p>{user.name}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
