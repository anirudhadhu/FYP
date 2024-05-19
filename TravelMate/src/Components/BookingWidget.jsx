import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, addDays } from "date-fns";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FaPlaneDeparture, FaBus } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [sessionId, setSessionId] = useState("");

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

    const totalPrice =
      numberOfDays * place.price * numberOfGuests + perkPrice * numberOfGuests;

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
      totalPrice,
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

 const handlePaymentSuccess = async (token) => {
  try {
    const response = await axios.post("/create-checkout-session", {
      amount: numberOfDays * place.price * numberOfGuests * 100,
      currency: "NPR",
      description: `Booking for ${place.title} (${numberOfDays} days)`,
    });

    const { sessionId } = response.data;
    setSessionId(sessionId);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    // Handle the error gracefully, display a message to the user, etc.
    setError("Failed to create checkout session. Please try again later.");
  }
};

  

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
                </span>{" "}
              </p>
              <div className="p-2">
                <p className="mt-3 font-semibold underline">Cash Payment:</p>
                <button
                  onClick={bookedThisPlace}
                  className="primary mt-4 hover:bg-green-500 hover:text-black "
                >
                  Book now!
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <StripeCheckout
                token={handlePaymentSuccess}
                stripeKey="pk_test_51P83FbSGDXorlL6rI0q89ZRZvcqkdvM9dnsr4TYRK8XlwxxEHJXQDoZzfbF0Qo4RjILGy8TWEvshkmQ2ZOd8egJZ003zmvmc75"
                sessionId={sessionId}
                amount={numberOfDays * place.price * numberOfGuests * 100} // Amount in cents
                name={place.title}
                description={`Booking for ${numberOfDays} days`}
                currency="NPR"
                billingAddress={false}
                shippingAddress={false}
                zipCode={false}
              >
                <button className="primary mt-4 hover:bg-green-500 hover:text-black">
                  Pay with Stripe!
                </button>
              </StripeCheckout>
            </div>
          </>
        )}
    </div>
  );
};

export default BookingWidget;
