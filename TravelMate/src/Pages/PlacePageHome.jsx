import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";

const PlacePageHome = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "Loading...";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  text-white min-h-screen">
        <div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div
                key={index}
                className="bg-white p-6 h-screen w-full flex items-center justify-center"
              >
                <div className="max-w-2xl mx-auto">
                  <h2 className=" text-3xl font-semibold underline mb-4 text-center text-black">
                    Photos of {place.title}
                  </h2>
                  <button
                    onClick={() => setShowAllPhotos(false)}
                    className=" fixed right-8 top-8 flex items-center gap-1 py-2 px-4 rounded-lg bg-primary text-white focus:outline-none hover:bg-primary-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Close photos
                  </button>
                  <div className="w-full h-96 overflow-hidden rounded-2xl">
                    <img
                      src={"http://localhost:4000/uploads/" + photo}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 px-8 py-8 border sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 rounded-2xl">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
        className="flex text-m font-semibold underline my-3 text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>

        {place.address}
      </a>

      <div className="relative">
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>

          <div>
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
          </div>

          <div>
            {place.photos?.[2] && (
              <img onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            color="rgb(130, 0, 237)"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="my-4 text-justify">
        <h1 className="font-semibold underline text-2xl">Description</h1>
        {place.description}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <b className="p-2">Check-in: </b>
          {place.checkIn} <br />
          <b className="p-2">Check-out: </b>
          {place.checkOut} <br />
          <b className="p-2">Max number of guest: </b>
          {place.maxGuests} <br />
          <div className="mt-6 border border-primary py-9">
            <p className=" text-center font-bold">Calculation:</p>
            Calculation part goes here
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8">
        <div>
          <h2 className="font-semibold underline text-2xl">
            Extra Information:
          </h2>
        </div>
        <div className="mt-2 mb-4 text-m text-gray-700 leading-4">
          {place.extraInfo}
        </div>
        {/* <div className="mt-2 mb-4 text-m text-gray-700 leading-4">
          {place.perks}
        </div> */}
      </div>
    </div>
  );
};

export default PlacePageHome;
