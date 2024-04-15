import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
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

  const handleSave = (e, id) => {
    e.stopPropagation(); // Stop the event from bubbling
    if (savedPlaces.includes(id)) {
      // Remove the place from savedPlaces if already saved
      setSavedPlaces(savedPlaces.filter((placeId) => placeId !== id));
    } else {
      // Add the place to savedPlaces if not saved
      setSavedPlaces([...savedPlaces, id]);
    }
  };

  const isPlaceSaved = (id) => {
    return savedPlaces.includes(id);
  };

  return (
    <div className="mt-10 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id} className="place-card">
            <Link to={"/place/" + place._id}>
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
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_0fr]">
              <div className="mt-2">
                <span className="font-bold">NPR ({place.price})</span> per
                person
              </div>
              <div
                onClick={(e) => handleSave(e, place._id)}
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  isPlaceSaved(place._id) ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {isPlaceSaved(place._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
