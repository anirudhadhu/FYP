// ParentComponent.js

import React, { useState } from "react";
import BookingDetails from "./BookingDetails";

const ParentComponent = () => {
  const [bookingId, setBookingId] = useState(/* Fetch or set the booking ID */);

  return (
    <div>
      {bookingId ? (
        <BookingDetails bookingId={bookingId} />
      ) : (
        <p>No booking ID available</p>
      )}
    </div>
  );
};

export default ParentComponent;
