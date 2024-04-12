import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      const { data } = response;
      if (data === "user not found" || data === "wrong pass") {
        // If user not found or wrong password, show appropriate message
        alert("Login failed: Incorrect email or password");
      } else {
        // If login successful, update user context and redirect
        setUser(data);
        alert("Login successful");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: Something went wrong");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl text-center mb-8">Welcome Back!</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link className="underline text-black" to="/register">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
