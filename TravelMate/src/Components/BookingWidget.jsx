import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, addDays } from "date-fns"; // Import addDays from date-fns
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("");

  let numberOfDays = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setNumber(user.number);
    }
  }, [user]);

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookedThisPlace() {
    if (numberOfDays <= 0) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const data = {
      place: place._id,
      title: place.title,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      number,
      price: place.price,
      numberOfDays,
      totalPrice: numberOfDays * place.price * numberOfGuests,
    };
    try {
      const response = await axios.post("/bookings", data);
      console.log("Booking successful:", response.data);
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking:", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Calculate the minimum date as the day after tomorrow
  const minDate = addDays(new Date(), 2).toISOString().split('T')[0];

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <b className="text-xl text-center">Price: </b>NPR {place.price} /per day
      {user ? (
        <div className="border border-primary rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check-In:</label>
              <input
                type="date"
                value={checkIn}
                min={minDate} // Set min to the day after tomorrow
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-primary border-l">
              <label>Check-Out:</label>
              <input
                type="date"
                value={checkOut}
                min={minDate} // Set min to the day after tomorrow
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-2 px-4 border-primary border-t">
            <label>Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>

          {numberOfDays > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="number"
                value={number}
                onChange={(ev) => setNumber(ev.target.value)}
              />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="py-2 px-4 mt-3 border-primary border-t">
          <p className="text-center">
            Please{" "}
            <Link to="/login" className="text-primary ">
              log in
            </Link>{" "}
            to select dates and complete your booking.
          </p>
        </div>
      )}
      {user && checkIn && checkOut && numberOfGuests > 0 && numberOfDays > 0 && (
        <div className="mt-4 border border-primary p-2">
          <p className="text-center font-bold p-3">Calculation:</p>
          Number of days:{" "}
          <span className="font-bold">
            {differenceInCalendarDays(new Date(checkOut), new Date(checkIn))} Days
          </span>
          <p>
            Price:{" "}
            <span className="font-bold">
              NPR{" "}
              {differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
                place.price *
                numberOfGuests}{" "}
            </span>{" "}
          </p>
          <button onClick={bookedThisPlace} className="primary mt-4">
            Book now!
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
