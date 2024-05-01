import React from "react";
import { useLocation, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Scroll from "../Pages/Scroll";

const SortPlaces = () => {
  const { state } = useLocation();
  const sortedPlaces = state?.sortedPlaces || [];

  return (
    <>
      <Home />
      <div>
        <h2 className="mt-32 text-2xl underline text-center font-semibold">
          Sort Results
        </h2>
        <div className="p-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedPlaces.map((place) => (
            <Link key={place._id} to={`/place/${place._id}`}>
              <div className="place-card">
                <div className="relative bg-gray-500 rounded-2xl overflow-hidden aspect-square">
                  {place.photos?.[0] && (
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-gray-500">{place.address}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_0fr] mt-4">
                  <div>
                    <p className="font-bold">NPR ({place.price}) per person</p>
                    {/* Render other details such as description, amenities, etc. */}
                  </div>
                  {/* Render favorite icon or any other actions */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Scroll/>
    </>
  );
};

export default SortPlaces;
