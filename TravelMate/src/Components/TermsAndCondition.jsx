import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition = () => {
  return (
    <div className=" p-6 mt-4 text-center">
      <div className="text-2xl font-semibold underline">
        Terms and Conditions
      </div>
      <div className="grid gap-20 grid-cols-1 md:grid-cols-[1fr_3fr]">
        <div className="mt-4 text-justify text-m">
          <p className="font-bold flex"> Welcome to TravelMate, </p> Your
          ultimate travel booking platform. Before you embark on your journey,
          please take a moment to read through our terms and conditions
          carefully.
        </div>
        <div className="mt-10  text-justify text-m">
          <p>
            1. All bookings made through TravelMate are subject to availability.{" "}
            <br />
            2. Users must provide accurate and complete information during the
            booking process. <br />
            3. Booking confirmation will be sent via email upon successful
            transaction completion. <br />
            4. Payment for bookings must be made in full at the time of
            reservation. <br />
            5. Prices displayed on TravelMate are inclusive of taxes and fees
            unless otherwise stated. <br />
            6. Extra amount will be charge if the customer damages the assets.{" "}
            <br />
            7. Extra amount will be charge if any unavoidable event occurs
            (Example: Flood, landslides e.t.c). <br />
            8. Cancellation policies vary depending on the service provider and
            the type of booking. <br />
            9. Refunds, if applicable, will be processed according to the
            cancellation policy of the service provider. <br />
            10. Users are responsible for maintaining the confidentiality of
            their account credentials. <br />
            11. Users must not engage in any unlawful or unauthorized activities
            on TravelMate. <br />
            12. Any misuse of the platform may result in account suspension or
            termination. <br />
            13. TravelMate strives to provide accurate information, but we do
            not guarantee the completeness or reliability of the content. <br />
            14. TravelMate reserves the right to cancel or modify any booking
            without prior notice. <br />
            15. TravelMate is not responsible for any lost or stolen items.{" "}
            <br />
            <p className="mt-4 font-bold">Acceptance of Terms:</p>
            By accessing or using TravelMate in any manner, you agree to be
            bound by these Terms and Conditions.
          </p>
          <div className="mt-4">
            If you have any questions or concerns, please
            <Link className="underline font-bold " to={"/contact"}>
              {" "}
              Contact Us.
            </Link>
            <p className="mt-2 font-semibold">
            Thank you for choosing TravelMate for your travel needs, <br /> Explore the world with ease !!
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
