import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    // Check if there are no photos for the place
    return ""; // Return an empty string if there are no photos
  }

  if (!className) {
    // If className is not provided, default to "object-cover"
    className = "object-cover";
  }

  const imgStyle = {
    width: "100%", // Set image width to 100% of container
    height: "100", // Maintain aspect ratio
    objectFit: "cover", // Ensure image covers the container
  };

  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      style={imgStyle}
      alt=""
    />
  );
};

export default PlaceImg;
