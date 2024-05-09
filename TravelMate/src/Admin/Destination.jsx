import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Destination = () => {
  const [places, setPlaces] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/allplaces/${id}`);
      setPlaces(places.filter((place) => place._id !== id));
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
      <div className="px-32 mt-1 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id} className="place-card">
              <div className="relative bg-gray-500 rounded-2xl overflow-hidden aspect-square">
                {place.photos?.[0] && (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="text-m leading-5 font-bold">{place.title}</h2>
              <h3 className="text-sm text-gray-500 truncate">
                {place.address}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-[2fr_0fr]">
                <div className="mt-2">
                  <span className="font-bold">NPR ({place.price})</span> per
                  person
                </div>
                <div className="mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 cursor-pointer text-red-500"
                    onClick={() => handleDelete(place._id)}
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
