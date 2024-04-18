import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Regular expression pattern for number validation (10 digits)
  const numberRegex = /^\d{10}$/;

  async function registerUser(ev) {
    ev.preventDefault();
    // Validate number against regex pattern
    if (!numberRegex.test(number)) {
      alert("Please enter a valid 10-digit number");
      return;
    }
    try {
      await axios.post("/register", { 
        name, 
        number, 
        email, 
        password });

      alert("Registration successful. Now you can login !");
      setRedirect(true);
    } catch (e) {
      alert("The Email address is already used.");
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-20 flex items-center justify-center ">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl text-center mb-8">Register </h1>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            Full Name:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="abc xyz"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            Number:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="1234567890"
              value={number}
              onChange={(ev) => setNumber(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            Email:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-5 relative">
            Password:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              placeholder="Hard password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              className="absolute right-0 top-0 mt-10 mr-4 focus:outline-none"
              type="button"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5v3m0 8.5v3m-4-8.5H5m14 0h-3"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v3m0 10.5V20m0-7h.01M6 12h.01M18 12h.01"
                  />
                </svg>
              )}
            </button>
          </div>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already Have an account?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
