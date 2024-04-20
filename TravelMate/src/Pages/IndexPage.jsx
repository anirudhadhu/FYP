import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "../Pages/Home";
import Scroll from "../Pages/Scroll";
import VideoBar from "../Pages/VideoBar";
import FavoriteIcon from "../Components/FavoriteIcon";
import {UserContext} from "../UserContext";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    axios
      .get("/favorites")
      .then((response) => {
        const savedPlaceIds = response.data.map((favorite) => favorite.place._id);
        setSavedPlaces(savedPlaceIds);
      })
      .catch((error) => {
        console.error("Error fetching saved places:", error);
      });
  }, []);

  const handleSave = async (e, id) => {
    e.stopPropagation();
    
    if (user) {
      if (isPlaceSaved(id)) {
        handleRemove(e, id);
      } else {
        try {
          const response = await axios.post("/favorites", { place: id });
          if (response.status === 201) {
            setSavedPlaces([...savedPlaces, id]);
          }
        } catch (error) {
          console.error("Error adding place to favorites:", error);
        }
      }
    } else {
      alert("Please log in to save places");
      window.location.href = "/login";
    }
  };

  const handleRemove = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`/favorites/${id}`);
      setSavedPlaces(savedPlaces.filter((savedId) => savedId !== id));
    } catch (error) {
      console.error("Error removing place from favorites:", error);
    }
  };

  const isPlaceSaved = (id) => {
    return savedPlaces.includes(id);
  };

  return (
    <>
      <Home />
      <Scroll />

      <div className="mt-32 p-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
