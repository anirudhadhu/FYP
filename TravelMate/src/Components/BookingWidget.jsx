import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, addDays } from "date-fns";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FaPlaneDeparture, FaBus, FaCar } from "react-icons/fa";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const { user } = useContext(UserContext);
  const [selectedPerk, setSelectedPerk] = useState("");
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
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookedThisPlace() {
    if (numberOfDays <= 0) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    let perkPrice = 0;
    switch (selectedPerk) {
      case "Aeroplane":
        perkPrice = 8000;
        break;
      case "Bus":
        perkPrice = 3000;
        break;
      default:
        break;
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
      perks: selectedPerk,
      perkPrice,
      totalPrice:
        numberOfDays * place.price * numberOfGuests +
        perkPrice * numberOfGuests,
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

  const minDate = addDays(new Date(), 2).toISOString().split("T")[0];

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
                min={minDate}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-primary border-l">
              <label>Check-Out:</label>
              <input
                type="date"
                value={checkOut}
                min={minDate}
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
      {user &&
        checkIn &&
        checkOut &&
        numberOfGuests > 0 &&
        numberOfDays > 0 && (
          <>
            {/* ---------------------for booking perks----------------------------- */}
            <div className="mt-4 border border-primary p-2">
              Select your Transportation way:
              <label className="mt-2 border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="perk"
                  checked={selectedPerk === "Aeroplane"}
                  onChange={() => setSelectedPerk("Aeroplane")}
                />
                <FaPlaneDeparture className="text-primary" />
                <span>Aeroplane</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="perk"
                  checked={selectedPerk === "Bus"}
                  onChange={() => setSelectedPerk("Bus")}
                />
                <FaBus className="text-primary" />
                <span>Bus</span>
              </label>
            </div>
            {/* ---------------------end of  booking perks----------------------------- */}
            {/* ---------------------Calculation part----------------------------- */}
            <div className="mt-4 border border-primary p-2">
              <p className="text-center font-bold p-3">Calculation:</p>
             
              Number of days:{" "}
              <span className="font-bold">
                {differenceInCalendarDays(
                  new Date(checkOut),
                  new Date(checkIn)
                )}{" "}
                Days
              </span>
              <div>
                Transportation Cost:{" "}
                <span className="font-bold">
                  {selectedPerk === "Aeroplane"
                    ? `NPR ${8000 * numberOfGuests}`
                    : selectedPerk === "Bus"
                    ? `NPR ${3000 * numberOfGuests}`
                    : selectedPerk === "Car"
                    ? `Customize based on Car`
                    : "N/A"}
                </span>
              </div>
              <p>
                Total Price:{" "}
                <span className="font-bold">
                  NPR{" "}
                  {differenceInCalendarDays(
                    new Date(checkOut),
                    new Date(checkIn)
                  ) *
                    place.price *
                    numberOfGuests +
                    (selectedPerk === "Aeroplane"
                      ? 8000 * numberOfGuests
                      : selectedPerk === "Bus"
                      ? 3000 * numberOfGuests
                      : 0)}{" "}
                </span>{" "}
              </p>
              <div className="p-2">
                <p className="mt-3 font-semibold underline">Cash Payment:</p>
                <button onClick={bookedThisPlace} className="primary mt-4">
                  Book now!
                </button>

                <p className="mt-3 font-semibold underline">Pay Now:</p>
                <button className="primary mt-4">Pay with Stripe!</button>

                <button className="primary mt-4">Pay with Khalti!</button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default BookingWidget;
