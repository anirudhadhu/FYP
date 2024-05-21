import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Destination = () => {
  const [places, setPlaces] = useState([]);  // State for storing places
  const [sortOrder, setSortOrder] = useState("desc"); // State for sorting order


  // useEffect hook to fetch places when sortOrder changes
  useEffect(() => {
    fetchPlaces(); // Call fetchPlaces function
  }, [sortOrder]);   // Dependency array with sortOrder

    // Function to fetch places from the server
  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`/sort-places?sort=${sortOrder}`); // Fetch places from the server with the specified sort order
      setPlaces(response.data);   // Update places state with the fetched data
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

   // Function to handle deletion of a place
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/allplaces/${id}`);   // Send a delete request to the server to delete the place with the specified id
      setPlaces(places.filter((place) => place._id !== id));   // Update places state to remove the deleted place
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div className="p-9">
      <Navbar />
      <h2 className="text-2xl underline font-semibold p-9 mb-4 text-center">
        Destinations listed in TravelMate{" "}
      </h2>

      
      <div className="flex justify-start mb-6 px-9">
        <label className="mr-2 font-semibold text-lg">Sort By:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          
          <option value="desc">High to Low</option>
          <option value="asc">Low to High</option>
          
        </select>
      </div>

      <div className="px-8 mt-4 grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Map through places and render destination cards */}
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id} className="place-card p-4 bg-white rounded-lg shadow-md">
              <div className="relative bg-gray-300 rounded-xl overflow-hidden aspect-square mb-4">
                 {/* Display the first photo of the place */}
                {place.photos?.[0] && (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">{place.title}</h2>
              <h3 className="text-md text-gray-600 mb-4 truncate">{place.address}</h3>

              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">NPR {place.price} per person</div>
                {/* Button to delete the place */}
                <div className="text-red-500 cursor-pointer" onClick={() => handleDelete(place._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Destination;
