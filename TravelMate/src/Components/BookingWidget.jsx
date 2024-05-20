import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, addDays } from "date-fns";
import { Link, Navigate } from "react-router-dom";
import { FaPlaneDeparture, FaBus } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../UserContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PICsO030mp3Dwv9DfoUMQQc07qb9LAT8CIwVabmUEOdSXAUGIxBYZgKGHj3z180YB2EwgBhuqsSlqF83da4KO1E00WMnBd4rx"
); // Replace with your Stripe publishable key

const BookingWidget = ({ place }) => {
  const { user } = useContext(UserContext);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [selectedPerk, setSelectedPerk] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");

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

  const handleBooking = async (paymentIntent) => {
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

    const totalPrice =
      numberOfDays * place.price * numberOfGuests + perkPrice * numberOfGuests;

    const bookingData = {
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
      totalPrice,
      paymentIntentId: paymentIntent.id, 
      description: `${place.title} - ${numberOfDays} days `,
      Customer: name,
    };

    try {
      const response = await axios.post("/bookings", bookingData);
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking:", error);
      setError("Booking failed. Please try again later.");
    }
  };

  const minDate = addDays(new Date(), 2).toISOString().split("T")[0];

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Elements stripe={stripePromise}>
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
              : "N/A"}
          </span>
        </div>
        <p>
          Total Price:
          <span className="font-bold">
            NPR{" "}
            {numberOfDays * place.price * numberOfGuests +
              (selectedPerk === "Aeroplane"
                ? 8000 * numberOfGuests
                : selectedPerk === "Bus"
                ? 3000 * numberOfGuests
                : 0)}{" "}
          </span>
        </p>
        <div className=" mt-4 p-4 bg-gray-200 rounded-xl">
          <p className="mb-4 text-sm font-semibold underline">
            Enter your Card details:
          </p>
          {selectedPerk && ( // Conditionally render StripeCheckoutForm
            <StripeCheckoutForm
              checkIn={checkIn}
              checkOut={checkOut}
              numberOfDays={numberOfDays}
              numberOfGuests={numberOfGuests}
              place={place}
              handleBooking={handleBooking}
              perkPrice={ // Pass the correct perkPrice here
                selectedPerk === "Aeroplane"
                  ? 8000
                  : selectedPerk === "Bus"
                  ? 3000
                  : 0
              }
            />
          )}
        </div>
      </div>
    </>
  )}

      </div>
    </Elements>
  );
};

const StripeCheckoutForm = ({
  numberOfDays,
  numberOfGuests,
  place,
  handleBooking,
  perkPrice,
  name,

}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data } = await axios.post("/create-payment-intent", {
        amount: (numberOfDays * place.price * numberOfGuests + perkPrice * numberOfGuests) * 100, // Convert to cents
        currency: "NPR",
      });

      const clientSecret = data.clientSecret; // Access the clientSecret property

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      
      if (paymentResult.error) {
        console.error("Payment failed:", paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        handleBooking(paymentResult.paymentIntent);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="primary mt-4 hover:bg-green-500 hover:text-black"
      >
        Pay with Stripe!
      </button>
    </form>
  );
};

export default BookingWidget;
