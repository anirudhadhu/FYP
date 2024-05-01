import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search?title=${searchQuery}`);
      const searchResults = response.data;
      if (searchResults.length > 0) {
        // Navigate to the search result page only if results are found
        navigate(`/search/${searchQuery}`);
      } else {
        // Redirect to a page indicating no results found
        navigate(`/search/not-found`);
      }
    } catch (error) {
      console.error("Error searching for places:", error);
    }
  };

  return (
    <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
            Explore the world with ease!
          </h1>
          <p data-aos="fade-up" data-aos-duration="2500" className="subtitle">
            Seamlessly Exploring Cultures, Cuisine, and Connections.
          </p>
        </div>

        <form className="homeCard grid" onSubmit={handleSearch}>
          <div>
            <label className="text-m font-semibold">Destination:</label>
            <input
              type="text"
              placeholder="Eg: Pokhara"
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary block w-full sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pattern="[A-Za-z]+"
              title="Please enter alphabets only"
              required
            />
          </div>
          <button type="submit" className="primary h-12 mt-7 px-6 rounded-lg">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
