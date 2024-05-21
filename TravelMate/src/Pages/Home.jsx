import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Aos from "aos"; // Importing AOS for animations
import "aos/dist/aos.css"; // Importing AOS CSS for animations
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [sortBy, setSortBy] = useState(""); // State variable for sorting option
  // const [places, setPlaces] = useState([]);

  // Initializing AOS animations on component mount
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.get(`/search?title=${searchQuery}`); // Sending a GET request to search for places
      const searchResults = response.data; // Extracting search results from response data
      if (searchResults.length > 0) {
        navigate(`/search/${searchQuery}`); // Navigate to search results page if results are found
      } else {
        navigate(`/search/not-found`); // Navigate to not found page if no results are found
      }
    } catch (error) {
      console.error("Error searching for places:", error);
    }
  };

  // Function to handle sorting option change
  const handleSortChange = async (e) => {
    const selectedSortBy = e.target.value; // Get the selected sorting option
    setSortBy(selectedSortBy); // Update the sorting state with the selected option

    try {
      const response = await axios.get(`/sort-places?sort=${selectedSortBy}`); // Sending a GET request to sort places
      const sortedPlaces = response.data; // Extracting sorted places from response data

      // Navigate to SortPlaces component and pass sortedPlaces as state
      navigate("/sort-places", { state: { sortedPlaces } });
    } catch (error) {
      console.error("Error sorting places:", error);
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

          <div className="border-l ml-4 border-primary rounded-2xl">
            <div className="ml-12">
              <label className="text-m font-semibold">Sort By:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary block w-full sm:text-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Select</option>
                <option value="desc">Price High to Low</option>
                <option value="asc">Price Low to High</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
