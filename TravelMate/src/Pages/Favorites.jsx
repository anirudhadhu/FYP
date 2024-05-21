import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Array to store favorite places
  const [loading, setLoading] = useState(true); // Boolean to track loading state

  // Fetch favorite places from the server when the component mounts
  useEffect(() => {
    axios
      .get("/favorites") // Sending a GET request to fetch favorite places
      .then((response) => {
        // If request is successful
        setFavorites(response.data); // Update the favorites state with the fetched data
        setLoading(false); // Set loading state to false since data has been fetched
      })
      .catch((error) => {
        console.error("Error fetching favorite places:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  return (
    <div>
      <p className="text-center mt-5 text-2xl underline font-semibold">
        Your favourites
      </p>
      {/* Conditional rendering based on whether there are favorite places or not */}
      {favorites.length === 0 ? (
        // If there are no favorite places, display a message indicating so
        <p className="text-center mt-28 mb-28 text-red-500 text-xl">
          No favorites available
        </p>
      ) : (
        // If there are favorite places, render them in a grid layout
        <div className="grid p-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favorites.map((favorite) => (
            // Each favorite place is wrapped in a Link component to navigate to its details page
            <div key={favorite._id} className="place-card">
              <Link to={`/place/${favorite.place._id}`}>
                {/* Displaying the first photo of the favorite place */}
                <img
                  src={`http://localhost:4000/uploads/${favorite.place.photos[0]}`}
                  alt={favorite.place.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="text-center mt-2">
                  <h3 className="text-lg font-semibold">
                    {favorite.place.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
