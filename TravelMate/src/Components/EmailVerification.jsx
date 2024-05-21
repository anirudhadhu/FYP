import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { verificationToken } = useParams();    // Extract the verification token from the URL parameters
  const [verificationMessage, setVerificationMessage] = useState("");     // State to store the verification message

  useEffect(() => {
    // Function to verify the email using the verification token
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/verify/${verificationToken}`);   // Send a GET request to the backend to verify the token
        console.log("Response from backend:", response);

         // Check if the response status is 200 (OK)
        if (response.status === 200) {
          // Update the verification message based on the response data
          if (response.data.message === "User verified successfully.") {
            setVerificationMessage("Your email has been verified. You can now login.");
          } else if (response.data.message === "User already verified.") {
            setVerificationMessage("Your email is verified.");
          } else {
            setVerificationMessage("Error: " + response.data.message);
          }
        } else {
          setVerificationMessage("Error: Unable to verify email. Please try again.");   // Set an error message if the response status is not 200
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationMessage("Error: Unable to verify email. Please try again.");
      }
    };

    // Call the verifyEmail function
    verifyEmail();
  }, [verificationToken]);

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl text-center mb-8">Email Verification for TravelMate</h1>
        <p className="text-center">{verificationMessage}</p>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Click here to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

// useParams: Extracts the verification token from the URL.
// useState: Manages the state of the verification message.
// useEffect: Runs the email verification process when the component mounts.
// axios.get: Sends a GET request to the backend to verify the email using the token.
// Response Handling: Updates the verification message based on the backend response.
// Error Handling: Logs errors and sets an error message if the verification fails.
// Link: Provides a link to the login page after verification.