import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Body = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalDestinations, setTotalDestinations] = useState(null);
  const [totalBookings, setTotalBookings] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/totalusers")
      .then((response) => {
        const data = response.data;
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => {
        console.error("Error fetching total number of users:", error);
        setError("Error fetching total number of users");
      });

    axios
      .get("/places")
      .then((response) => {
        const data = response.data;
        setTotalDestinations(data.length);
      })
      .catch((error) => {
        console.error("Error fetching total number of destinations:", error);
        setError("Error fetching total number of destinations");
      });

    axios
      .get("/totalBookings")
      .then((response) => {
        const data = response.data;
        setTotalBookings(data.totalBookings);
        setAllBookings(data.allBookings);
      })
      .catch((error) => {
        console.error("Error fetching total number of bookings:", error);
        setError("Error fetching total number of bookings");
      });
  }, []);

  return (
    <div className="mt-6 p-6">
      <p className="font-semibold text-2xl underline mb-16 text-center">
        Welcome Back Admin!
      </p>

      <div className="grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* for user */}
        <div className="p-4 sm:p-10 sm:pb-6 border-r border-primary rounded-3xl">
          <div>
            <h2 className="text-2xl font-semibold underline">Users</h2>
            <p className="mt-2 text-sm text-gray-500">
              Number of users registered in TravelMate.
            </p>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-light text-black">
              Total Users: {totalUsers === null ? "Loading..." : totalUsers}
            </span>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="p-3 mt-4">
            <Link
              to={"/Users"}
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-primary rounded-full hover:bg-transparent hover:text-black border border-primary text-sm"
            >
              View Users
            </Link>
          </div>
        </div>

        {/* for destinations */}
        <div className="p-4 sm:p-10 sm:pb-6 border-r border-primary rounded-3xl">
          <div>
            <h2 className="text-2xl font-semibold underline">Destinations</h2>
            <p className="mt-2 text-sm text-gray-500">
              Number of destinations in TravelMate.
            </p>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-light  text-black">
              Total Destinations:{" "}
              {totalDestinations === null ? "Loading..." : totalDestinations}
            </span>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="p-3 mt-4">
            <Link
              to={"/Destination"}
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-primary rounded-full hover:bg-transparent hover:text-black border border-primary text-sm"
            >
              View Destinations
            </Link>
          </div>
        </div>

        {/* for bookings */}
        <div className="p-4 sm:p-10 sm:pb-6 border-r border-primary rounded-3xl">
          <div>
            <h2 className="text-2xl font-semibold underline">Bookings</h2>
            <p className="mt-2 text-sm text-gray-500">
              Number of packages booked in TravelMate.
            </p>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-light text-black">
              Total Bookings:{" "}
              {totalBookings === null ? "Loading..." : totalBookings}
            </span>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="p-3 mt-4">
            <Link
              to={"/ViewBookings"}
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-primary rounded-full hover:bg-transparent hover:text-black border border-primary text-sm"
            >
              View Bookings
            </Link>
          </div>
          <div className="mt-4">
            <ul>
              {allBookings.map((booking) => (
                <li key={booking._id}></li>
              ))}
            </ul>
          </div>
        </div>

        {/* for documents */}
        <div className="p-4 sm:p-10 sm:pb-6 border-r border-primary rounded-3xl">
          <div>
            <h2 className="text-2xl font-semibold underline">Documents</h2>
            <p className="mt-2 text-sm text-gray-500">Documents of users.</p>
          </div>
          <div className="p-3 mt-16">
            <Link
              to={"/UserDocument"}
              className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-primary rounded-full hover:bg-transparent hover:text-black border border-primary text-sm"
            >
              View Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
