import React from "react";
import Unsuccesfull from "../assets/Unsuccesfull.jpg";

const Cancle = () => {
  return (
    <div className="p-9 mt-14  grid gap-20 grid-cols-1 md:grid-cols-[1fr_1fr]">
      <div className="mt-16 text-center text-red-500 font-semibold">
        Unfortunately, Your payment is not succesfull.
        <p>Please try again later.</p>
      </div>
      <div>
        <img
        className="h-64 w-64 p-6 border border-primary bg-red-400 rounded-full"
        
        src={Unsuccesfull} alt="" />
      </div>
    </div>
  );
};

export default Cancle;
