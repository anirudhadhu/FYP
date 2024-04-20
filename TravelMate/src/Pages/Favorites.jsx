import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteIcon from "../Components/FavoriteIcon";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/favorites")
      .then((response) => {
        setFavorites(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorite places:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  return (
    <div>
      <p className="text-center mt-5 text-2xl underline font-semibold">
        Your favourites
      </p>
      {favorites.length === 0 ? (
        <p className="text-center mt-28 mb-28 text-red-500 text-xl">No favorites available</p>
      ) : (
        <div className="grid p-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="place-card">
              <Link to={`/place/${favorite.place._id}`}>
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
