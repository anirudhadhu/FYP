import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../Components/AccountNav";
import UploadDocument from "../Components/UploadDocument";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext); // Accessing user context to get user data and functions
  const [redirect, setRedirect] = useState(null);

  // Extracting subpage from URL params, defaulting to "profile"
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Function to handle logout
  async function logout() {
    try {
      await axios.post("/logout"); // Logout request to the server
      setRedirect("/"); // Redirecting to the home page after logout
      setUser(null); // Resetting the user context after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // If user data is still loading, display a loading message
  if (!ready) {
    return "Loading...";
  }

  // If user is not logged in and there's no redirect set, navigate to the login page
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  // If redirect is set, navigate to the specified URL
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <div className="grid gap-20 ml-9  grid-cols-1 md:grid-cols-[1fr_2fr]">
        {subpage === "profile" && (
          <>
            <UploadDocument />

            <div className="text-center max-w-lg mx-auto mt-8 border border-l-primary p-6 ">
              <h2 className="text-xl font-semibold mb-4">
                Profile Information
              </h2>
              <div className=" bg-white text-sm shadow-md rounded-lg p-6 mx-auto max-w-md">
                <p className="flex text-gray-700 gap-2 ">
                  Logged in as: <strong>{user.name}</strong>
                </p>
                <p className="flex text-gray-700 gap-2 mt-4">
                  Contact Number: <strong>{user.number}</strong>
                </p>
                <p className="flex text-gray-700 mt-4 gap-2">
                  Email Address: <strong>{user.email}</strong>
                </p>
                {/* Button to trigger logout */}
                <button
                  onClick={logout}
                  className=" primary mt-4 px-4 py-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Log out
                </button>
              </div>
              <div className="mt-3 flex text-m">
                Delete your Account ?
                <Link to="/contact" className="text-primary ml-2">
                  Click here
                </Link>
              </div>
              <span className="flex text-red-500 text-sm">
                {" "}
                To delete your account please fill out the form.{" "}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Displaying user's places if the subpage is "places" */}
      {subpage === "places" && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Your Places
          </h2>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

// User Context Access: Utilizes the useContext hook to access the user context, including user data and functions.
// Logout Functionality: Implements a function logout to handle user logout by sending a request to the server, resetting the user context, and redirecting to the home page.
// Conditional Rendering: Renders different sections based on the subpage parameter from the URL.
// Profile Information Section: Displays user's profile information including name, contact number, and email address. Provides a button to trigger logout.
// Delete Account Link: Provides a link to initiate the account deletion process.
// Places Section: Displays user's places if the subpage is set to "places", utilizing the PlacesPage component.
