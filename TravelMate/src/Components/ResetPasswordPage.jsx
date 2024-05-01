import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`/reset-password/${token}`, {
        newPassword: password,
      });
      setSuccess(response.data.message);
    } catch (error) {
      setError("Failed to reset password");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="flex justify-center p-9">
      <div className="w-full max-w-md">
        <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl mb-6 underline">Reset your password</h2>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
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
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <button type="submit" className="bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
