import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../Styles/Home.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // State variables to hold search input values
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");

  // Function to handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Here you can send the search parameters to your backend API
    // For simplicity, let's just log the search parameters for now
    console.log("Location:", location);
    console.log("Days:", days);
    console.log("Price:", price);
  };

  return (
    <>
      <section className="home">
        <div className="secContainer container">
          <div className="homeText">
            <h1 data-aos="fade-up" className="title">
              Explore the world with ease!
            </h1>
            <p data-aos="fade-up" data-aos-duration="2500" className="subtitle">
              Seamlessly Exploring Cultures, Cuisine, and Connections.
              {/* Effortless Expedition Strategies for the Modern Explorer */}
            </p>
          </div>

          <form className="homeCard grid" onSubmit={handleSearch}>
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="locationDiv"
            >
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Dream Destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="2500"
              className="distDiv"
            >
              <label htmlFor="days">Number of Days:</label>
              <input
                type="number"
                name="days"
                id="days"
                placeholder="9"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="priceDiv"
            >
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="NRP 499"
                min="499"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button
              data-aos="fade-left"
              data-aos-duration="2000"
              className="btn"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
