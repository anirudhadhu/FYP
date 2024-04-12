import React from 'react'

const BookingWidget = ({ place }) => {
  return (
    <div className="bg-white shadow  p-4 rounded-2xl">
    <b className="text-xl text-center">Price: </b>NPR {place.price}/per
    person
    {/* ---------------------//for date---------------- */}
    <div className="border border-primary rounded-2xl mt-4">
      <div className="flex">
        <div className=" py-3 px-4 ">
          <label>Check-In:</label>
          <input type="date" />
        </div>
        <div className="py-3 px-4  border-primary border-l ">
          <label>Check-Out:</label>
          <input type="date" />
        </div>
      </div>
      <div className="py-3 px-4  border-primary border-t ">
          <label >Number of Guest:</label>
          <input type="number" value={2} />
        </div>
    </div>
    <button className="primary mt-4">Book now!</button>
  </div>
  )
}

export default BookingWidget;
