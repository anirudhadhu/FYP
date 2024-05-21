import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../Components/AddressLink";
import PlaceGallery from "../Components/PlaceGallery";
import BookingDates from "../Components/BookingDates";
import DownloadPdf from "../Components/DownloadPdf";

const BookingPage = () => {
  const { id } = useParams(); // Extract booking ID from URL params
  const [booking, setBooking] = useState(null); // State to hold booking data

  // Fetch booking details from the server based on ID
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        // Find the booking with the matching ID
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking); // Set booking state if found
        }
      });
    }
  }, [id]); // Trigger effect when ID changes

  // Render loading indicator if booking data is not yet fetched
  if (!booking) {
    return <div> Loading ...</div>;
  }

  return (
    <div className="p-16">
      <div id="booking-info">
        <h1 className="text-2xl"> {booking.place.title} </h1>
        <AddressLink className="my-2 block">
          {" "}
          {booking.place.address}{" "}
        </AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-xl mb-4 underline">
              Your Booking Information in TravelMate:
            </h2>
            <BookingDates booking={booking} />
            <div className="mt-6 text-m">
              Transportation: via {booking.perks}
            </div>
            <div className="mt-3 text-m">
              Number of Guest: {booking.numberOfGuests}
            </div>
          </div>
          <div className="bg-primary text-white p-4 rounded-2xl">
            <div>Total price:</div>
            <div className="text-3xl">NRP {booking.totalPrice}</div>
          </div>
        </div>
      </div>
      <DownloadPdf booking={booking} />
      <PlaceGallery photos={booking.place.photos} />
    </div>
  );
};

export default BookingPage;
