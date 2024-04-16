import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../Styles/Home.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

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

            {/* <button data-aos="fade-up" data-aos-duration="3000" className="btn">
              <a href="#" className="href">
                Explore Now
              </a>
            </button> */}
          </div>

          <div className="homeCard grid">
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
              />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="2500"
              className="distDiv"
            >
              <label htmlFor="distance">Distance</label>
              <input
                type="Number"
                name="location"
                id="location"
                placeholder="KM"
              />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="priceDiv"
            >
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="NRP 3000-45000"
              />
            </div>
            <button
              data-aos="fade-left"
              data-aos-duration="2000"
              className="btn"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
