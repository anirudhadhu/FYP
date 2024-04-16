import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setNumber(user.number);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookedThisPlace() {
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      number,
      price: place.price,
      numberOfDays: differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      ),
      totalPrice:
        differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
        place.price *
        numberOfGuests,
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

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <b className="text-xl text-center">Price: </b>NPR {place.price} /per day
      {/* ---------------------//for date---------------- */}
      {user ? (
        <div className="border border-primary rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check-In:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-primary border-l">
              <label>Check-Out:</label>
              <input
                type="date"
                value={checkOut}
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

          {/* <div className="py-2 px-4 border-primary border-t">
            <label>Full Name:</label>
            <input
              className="font-semibold"
              type="text"
              value={user.name}
              readOnly
            />
            <label>Contact Number:</label>
            <input
              className="font-semibold"
              type="number"
              value={user.number}
              readOnly
            />
          </div> */}
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
      {user && checkIn && checkOut && numberOfGuests > 0 && (
        <div className="mt-4 border border-primary p-2">
          <p className="text-center font-bold p-3">Calculation:</p>
          Number of days:{" "}
          <span className="font-bold">
            {differenceInCalendarDays(new Date(checkOut), new Date(checkIn))}{" "}
            Days
          </span>
          <p>
            Price:{" "}
            <span className="font-bold">
              NRP{" "}
              {differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
                place.price *
                numberOfGuests}{" "}
            </span>{" "}
          </p>
        </div>
      )}
      {user && checkIn && checkOut && numberOfGuests > 0 && (
        <button onClick={bookedThisPlace} className="primary mt-4">
          Book now!
        </button>
      )}
    </div>
  );
};

export default BookingWidget;
