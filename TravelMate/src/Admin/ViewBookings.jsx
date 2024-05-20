import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/totalBookings")
      .then((response) => {
        const data = response.data;
        setBookings(data.allBookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings");
      });
  }, []);

  const deleteBooking = (bookingId) => {
    axios
      .delete(`/bookings/${bookingId}`)
      .then(() => {
        // If deletion is successful, update the state to remove the deleted booking
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        setError("Error deleting booking");
      });
  };

  const updateBooking = (bookingId, newData) => {
    axios
      .put(`/bookings/${bookingId}`, newData)
      .then(() => {
        // If update is successful, fetch the updated bookings and update the state
        axios
          .get("/totalBookings")
          .then((response) => {
            const data = response.data;
            setBookings(data.allBookings);
          })
          .catch((error) => {
            console.error("Error fetching bookings:", error);
            setError("Error fetching bookings");
          });
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        setError("Error updating booking");
      });
  };

  return (
    <div className="p-9">
      <Navbar />
      <div>
        <h2 className="text-2xl underline font-semibold p-9 mb-4 text-center">
          Bookings in TravelMate{" "}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border-r border-primary rounded-3xl p-6 relative"
            >
              <p className="mb-2  font-semibold">Name: {booking.name}</p>
              <p >Place: {booking.title}</p>
              <p className="mt-1">Number: {booking.number}</p>
              <p className="mt-1">Price: NRP {booking.price}</p>
              <p className="mt-1">Check-in: {new Date(booking.checkIn).toDateString()}</p>
              <p className="mt-1">Check-out: {new Date(booking.checkOut).toDateString()}</p>
              <p className="mt-1">Number of guests: {booking.numberOfGuests}</p>
              <p className="mt-1">Transportation: {booking.perks}</p>
              <p className="mt-1">Total price: NRP {booking.totalPrice}</p>
              <p className="mt-1">Payment ID:   {booking.paymentIntentId}</p>
              <hr className="my-6" />

              <button
                className="absolute  bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                onClick={() => deleteBooking(booking._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
