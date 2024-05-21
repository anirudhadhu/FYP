import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import axios from "axios";
import PhotosUploader from "../Components/PhotosUploader";
import Perks from "../Components/Perks";

const PlacesFormPage = () => {
  const { id } = useParams();
  // State variables to manage form inputs and submission
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const [redirect, setRedirect] = useState(false);

  // Effect to fetch place data if editing an existing place
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/places/" + id)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error("Error fetching place data:", error);
      });
  }, [id]);

  // Function to render input header
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  // Function to render input description
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  // Function to render pre-input section
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // Function to handle form submission
  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };

  // Redirect if submission is successful
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form className="p-9" onSubmit={savePlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title"
          required
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Adress"
          required
        />

        {preInput("Photos", "More = Better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "More = Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
        />

        {preInput("Perks", "Select all the perks")}
        <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info:", "Includes and Excludes")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {preInput(
          "Check in/out times:",
          "Add check-in and check-out times, restrictions on the number of guests, and other helpful information."
        )}
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="05:15 AM"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:11 AM"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Min number of Days</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              min="1"
              required
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Price Per Person</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              min="1"
              required
            />
          </div>
        </div>

        <button className="primary my-4">Submit</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
