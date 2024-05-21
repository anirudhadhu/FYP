import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../Components/BookingWidget";
import PlaceGallery from "../Components/PlaceGallery";
import AddressLink from "../Components/AddressLink";

const PlacePageHome = () => {
  const { id } = useParams(); // Retrieve the id parameter from the URL
  const [place, setPlace] = useState(null);

  // Fetch place data from the server when the id changes
  useEffect(() => {
    if (!id) {
      // Check if id exists
      return;
    }
    // Fetch place data using the id
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  // Render loading message if place data is not yet fetched
  if (!place) {
    return "Loading...";
  }

  return (
    <div className="mt-12 bg-gray-50 px-8 py-8 border sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 rounded-2xl">
      <h1 className="text-2xl">{place.title}</h1>

      <AddressLink> {place.address} </AddressLink>

      <PlaceGallery photos={place.photos} />

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
          <b className="p-2">Max number of Days: </b>
          {place.maxGuests} <br />
          <div className="bg-white -mx-8 px-8 py-8">
            <div>
              <h2 className="font-semibold underline text-2xl ">
                Extra Information:
              </h2>
              <div className="mt-2 mb-4 text-m text-gray-700 text-justify leading-2 ">
                {place.extraInfo}
              </div>
            </div>
          </div>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className=" border border-primary rounded-xl p-3 text-sm">
        <p className="text-red-500">Note: Total price is calculated as:</p>
        (Total Days * Price of destination * Number Of Guests) + (
        Transportation Cost * Number Of Guests)
      </div>
    </div>
  );
};

export default PlacePageHome;
