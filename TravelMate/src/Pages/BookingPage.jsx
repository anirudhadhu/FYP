import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../Components/AddressLink";
import PlaceGallery from "../Components/PlaceGallery";
import BookingDates from "../Components/BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return <div> Loading ...</div>;
  }

  return (
    // <div>
    //   booking id: {id}

    // </div>
    <div className="p-16 ">
      <h1 className="text-2xl "> {booking.place.title} </h1>
      <AddressLink className="my-2 block">
        {" "}
        {booking.place.address}{" "}
      </AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-4">Your Boooking Information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary text-white p-4 rounded-2xl">
          <div>Total price:</div>
          <div className="text-3xl">NRP {booking.totalPrice}</div>
        </div>
      </div>
      <PlaceGallery photos={booking.place.photos} />
    </div>
  );
};

export default BookingPage;
