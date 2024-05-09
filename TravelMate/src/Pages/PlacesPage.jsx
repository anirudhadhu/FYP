import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import axios from "axios";
import PlaceImg from "../Components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const handleDeletePlace = async (id) => {
    try {
      const response = await axios.delete(`/allplaces/${id}`);
      if (response.status === 200) {
        setPlaces(places.filter((place) => place._id !== id));
      }
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      {/* To show info */}
      <div className=" p-9 grid gap-x-8 gap-y-12 grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {places.length > 0 &&
          places.map((place) => (
            <>
              <Link
                key={place._id}
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 border-r border-primary bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300  shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.address}</p>
                </div>
              </Link>
              <div>
                <button
                  className="mt-8 bg-primary flex gap-2 cursor-default hover:bg-red-600 hover:text-black text-white text-m py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeletePlace(place._id)}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
