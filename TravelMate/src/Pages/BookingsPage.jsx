import React, { useEffect, useState } from "react";
import AccountNav from "../Components/AccountNav";
import axios from "axios";
import PlaceImg from "../Components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../Components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/bookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AccountNav />
      <div className=" p-9 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-5 mb-6 bg-gray-200 rounded-2xl overflow-hidden"
              key={booking._id}
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <BookingDates booking={booking} className="border-t border-primary mt-2 py-2 flex gap-2  text-m" />
                <div className="text-m">
                  {booking.numberOfDays} Days || Price: NPR {booking.totalPrice}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No bookings available</div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
