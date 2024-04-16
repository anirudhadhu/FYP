import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../Components/AccountNav";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    try {
      await axios.post("/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div >
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className=" bg-white shadow-md rounded-lg p-6 mx-auto max-w-md">
            <p className="flex text-gray-700">
              Logged in as: <strong>{user.name}</strong>
            </p>
            <p className="flex text-gray-700">
              Contact Number: <strong>{user.number}</strong>
            </p>
            <p className="flex text-gray-700">
              Email Address: <strong>{user.email}</strong>
            </p>
            <button 
              onClick={logout}
              className=" primary mt-4 px-4 py-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Log out
            </button>
          </div>
        </div>
      )}

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
