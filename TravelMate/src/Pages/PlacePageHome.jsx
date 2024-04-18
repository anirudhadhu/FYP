import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../Components/BookingWidget";
import PlaceGallery from "../Components/PlaceGallery";
import AddressLink from "../Components/AddressLink";

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
              <h2 className="font-semibold underline text-2xl">
                Extra Information:
              </h2>
              <div className="mt-2 mb-4 text-m text-gray-700 leading-4">
                {place.extraInfo}
              </div>
            </div>
          </div>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
};

export default PlacePageHome;
