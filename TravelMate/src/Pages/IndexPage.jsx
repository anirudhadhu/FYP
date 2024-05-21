import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "../Pages/Home";
import Scroll from "../Pages/Scroll";
import VideoBar from "../Pages/VideoBar";
import FavoriteIcon from "../Components/FavoriteIcon";
import { UserContext } from "../UserContext";

const IndexPage = () => {
  const [places, setPlaces] = useState([]); // State variable for places
  const [savedPlaces, setSavedPlaces] = useState([]); // State variable for saved places
  const { user } = useContext(UserContext); // Getting user context from UserContext

  // Effect hook to fetch places on component mount
  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data); // Setting fetched places to state
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/favorites") // Sending a GET request to fetch saved places
      .then((response) => {
        const savedPlaceIds = response.data.map(
          (favorite) => favorite.place._id
        );
        setSavedPlaces(savedPlaceIds); // Setting fetched saved places to state
      })
      .catch((error) => {
        console.error("Error fetching saved places:", error);
      });
  }, []);

  // Function to handle saving a place to favorites
  const handleSave = async (e, id) => {
    e.stopPropagation(); // Preventing event propagation

    if (user) {
      if (isPlaceSaved(id)) {
        // Checking if place is already saved
        handleRemove(e, id); // If place is already saved, remove it from favorites
      } else {
        try {
          const response = await axios.post("/favorites", { place: id }); // Sending a POST request to save place to favorites
          if (response.status === 201) {
            // Checking if place is successfully saved
            setSavedPlaces([...savedPlaces, id]); // Updating saved places state with the newly saved place
          }
        } catch (error) {
          console.error("Error adding place to favorites:", error);
        }
      }
    } else {
      alert("Please log in to save places"); // Alerting user to log in if not already logged in
      window.location.href = "/login"; // Redirecting user to login page
    }
  };

  // Function to handle removing a place from favorites
  const handleRemove = async (e, id) => {
    e.stopPropagation(); // Preventing event propagation
    try {
      await axios.delete(`/favorites/${id}`); // Sending a DELETE request to remove place from favorites
      setSavedPlaces(savedPlaces.filter((savedId) => savedId !== id)); // Updating saved places state by filtering out the removed place
    } catch (error) {
      console.error("Error removing place from favorites:", error);
    }
  };

  // Function to check if a place is saved
  const isPlaceSaved = (id) => {
    return savedPlaces.includes(id);
  };

  return (
    <>
      <Home />
      <Scroll />

      <div className=" p-32 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                <FavoriteIcon
                  place={place}
                  handleSave={handleSave}
                  handleRemove={handleRemove}
                  isPlaceSaved={isPlaceSaved}
                />
              </div>
            </div>
          ))}
      </div>
      <VideoBar />
    </>
  );
};

export default IndexPage;
