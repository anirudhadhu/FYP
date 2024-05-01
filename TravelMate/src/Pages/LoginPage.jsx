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
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      const { data } = response;
      if (data.error) {
        alert("Login failed: " + data.error);
      } else {
        setUser(data.user);
        alert("Login successful");

        // Redirect to appropriate page based on user's role
        if (data.user.role === "admin") {
          setRedirect("/AdminHomePage");
        } else {
          setRedirect("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: Something went wrong");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (ev) => {
    ev.preventDefault(); // Prevent the default behavior of the button
    ev.stopPropagation(); // Stop the event from bubbling up
    setShowForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleSendResetLink = async () => {
    try {
      // Send email with reset link
      await axios.post("/forgot-password", { email });
      alert("Password reset link sent to your email");
      setShowForgotPasswordModal(false);
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Failed to send password reset link");
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-md w-full px-8 pt-6 pb-8 mb-4 border border-primary rounded-2xl">
        <h1 className="text-2xl text-center mb-8 underline font-semibold">Welcome Back!</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            Email:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="RegisteredEmail@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            Password:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              placeholder="******"
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
          <button className="primary hover:underline">Login</button>
          <div className="mt-4 ml-48">
            <div>
              <button
                className=" primary hover:underline "
                onClick={(ev) => handleForgotPassword(ev)}
              >
                Forgot password?
              </button>
            </div>
          </div>
          <div className="text-center p-4">
              <span className="text-gray-500">Don't have an account?</span>{" "}
              <Link className="underline text-black" to="/register">
                SignUp
              </Link>
            </div>
        </form>
      </div>
      {/* Forgot password modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg w-96 border border-primary">
            <h2 className="text-2xl mb-4 underline text-center">Forgot Password</h2>
            <input
              type="email"
              className="w-full border p-2 mb-4"
              placeholder="Enter your registered email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <div className="flex p-4 justify-between">
              <button className="primary hover:bg-green-500 hover:text-black  mr-2" onClick={handleSendResetLink}>
                Send Reset Link
              </button>
              <button className="primary hover:bg-red-500" onClick={handleCloseForgotPasswordModal}>
                Cancel
              </button>
            </div>
            <p>
              Note:
              <span className="text-red-500 ml-2 text-sm">
                Reset link will only be sent if you are registered in TravelMate.
              </span>
            </p>
          </div>
        </div>
      )}
      
    
    </div>
  );
};

export default LoginPage;
