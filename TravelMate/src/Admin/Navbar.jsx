import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import {Link, Navigate } from "react-router-dom";

const Navbar = () => {
    const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  async function logout() {
    try {
      await axios.post("/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex gap-96">
      <div className="flex items-center gap-1 ">
        <Link to={'/AdminHomePage'}
        className="flex">
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
        <span className="font-bold text-xl ">TravelMate</span>
        </Link>
        
      </div>
      <div className="hidden lg:flex rounded-full py-2 px-8">
        </div>
      <button
        onClick={logout}
        className=" primary mt-4 rounded-lg text-white hover:bg-primary focus:outline-none focus:bg-blue-700"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
