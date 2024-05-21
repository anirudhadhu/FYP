import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios for HTTP requests
import Chart from "chart.js/auto"; // Import Chart.js for charting

const Body = () => {
  // Declare state variables using useState hook
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalDestinations, setTotalDestinations] = useState(null);
  const [totalBookings, setTotalBookings] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    axios
      .get("/totalusers")
      .then((response) => {
        const data = response.data;
        setTotalUsers(data.totalUsers);  // Update state with total users
      })
      .catch((error) => {
        console.error("Error fetching total number of users:", error);
        setError("Error fetching total number of users");  // Update error state
      });

       // Fetch total number of destinations
    axios
      .get("/places")
      .then((response) => {
        const data = response.data;
        setTotalDestinations(data.length);    // Update state with total destinations
      })
      .catch((error) => {
        console.error("Error fetching total number of destinations:", error);
        setError("Error fetching total number of destinations");
      });

      // Fetch total number of bookings
    axios
      .get("/totalBookings")
      .then((response) => {
        const data = response.data;
        setTotalBookings(data.totalBookings);   // Update state with total bookings
        setAllBookings(data.allBookings);       // Update state with all bookings

      })
      .catch((error) => {
        console.error("Error fetching total number of bookings:", error);
        setError("Error fetching total number of bookings");
      });

       // Fetch total number of documents
    axios
      .get("/alldocuments")
      .then((response) => {
        const data = response.data;
        setTotalDocuments(data.length);   // Update state with total documents
      })
      .catch((error) => {
        console.error("Error fetching total number of documents:", error);
        setError("Error fetching total number of documents");
      });
  }, []);  // Empty dependency array means this effect runs once after initial render


  // Function to generate chart data for Chart.js
  const generateChartData = () => {
    return {
       // Define labels for the chart
      labels: ["Users", "Destinations", "Bookings", "Documents"],
      datasets: [{
        // Define the datasets for the chart
        label: 'Counts',
        data: [totalUsers, totalDestinations, totalBookings, totalDocuments],  // Data values corresponding to the labels
        // Background colors for each bar in the chart
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    };
  };


  // useEffect hook to render the chart when data is fetched
  useEffect(() => {
    const ctx = document.getElementById('myChart');  // Get the canvas element by its id
     // Check if the canvas element exists and all data is fetched
    if (ctx && totalUsers !== null && totalDestinations !== null && totalBookings !== null && totalDocuments !== null) {
         // Create a new Chart instance
      new Chart(ctx, {
        type: 'bar',
        data: generateChartData(),  // Chart data
        options: {
          scales: {
            y: {
              beginAtZero: true  // Start the y-axis at zero
            }
          }
        }
      });
    }
  }, [totalUsers, totalDestinations, totalBookings, totalDocuments]);  // Dependencies array

  return (
    <>
      <div className="mt-6 p-6">
        <p className="font-semibold text-2xl underline mb-16 text-center">
          Welcome Back Admin!
        </p>
        <canvas id="myChart" width="400" height="100"></canvas>
      </div>
      
      <div className="mt-6 p-6">
        <div className="grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* for users */}
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
            <div className="mt-3">
              <span className="text-2xl font-light text-black">
                Total Documents: {totalDocuments === null ? "Loading..." : totalDocuments}
              </span>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            
            <div className="p-3 mt-4">
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
    </>
  );
};

export default Body;
