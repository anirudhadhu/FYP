import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { verificationToken } = useParams();
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/verify/${verificationToken}`);
        setVerificationMessage("Your email has been verified. You can now login.");
      } catch (error) {
        setVerificationMessage("Error verifying email. Please try again.");
      }
    };

    verifyEmail();
  }, [verificationToken]);

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl text-center mb-8">Email Verification</h1>
        <p className="text-center">{verificationMessage}</p>
        <div className="text-center mt-4">
          {verificationMessage.includes("verified") ? (
            <Link to="/login" className="text-blue-500 hover:underline">
              Click here to login
            </Link>
          ) : (
            <Link to="/" className="text-blue-500 hover:underline">
              Go back
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
