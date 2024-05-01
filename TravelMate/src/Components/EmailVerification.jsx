import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { verificationToken } = useParams();
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/verify/${verificationToken}`);
        console.log("Response from backend:", response);

        if (response.status === 200) {
          if (response.data.message === "User verified successfully.") {
            setVerificationMessage("Your email has been verified. You can now login.");
          } else if (response.data.message === "User already verified.") {
            setVerificationMessage("Your email is verified.");
          } else {
            setVerificationMessage("Error: " + response.data.message);
          }
        } else {
          setVerificationMessage("Error: Unable to verify email. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationMessage("Error: Unable to verify email. Please try again.");
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
          <Link to="/login" className="text-blue-500 hover:underline">
            Click here to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
