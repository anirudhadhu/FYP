import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../Pages/Home";
import Scroll from "../Pages/Scroll";

const SearchResult = () => {
  const { destination } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/search?title=${destination}`);
        const data = response.data;
        if (data.length > 0) {
          setSearchResults(data);
          setNotFound(false); // Reset notFound state
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    fetchSearchResults();
  }, [destination]);
  

  if (notFound) {
    return (
      <>
      <Home/>
        <h2 className=" mt-8 text-2xl underline text-center font-semibold">
          Search Result
        </h2>
        <div className="flex justify-center mt-12 text-red-500 text-xl ">
          Oops! No results found.
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>
        <p className="text-gray-500 text-sm text-center mt-4">
          Try Searching different places.
        </p>
      </>
    );
  }

  return (
    <>
      <Home />
      <div className="p-9">
        <h2 className="mt-16 text-2xl underline text-center font-semibold">
          Search Result
        </h2>
        <div className="p-9 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result._id} className="p-4">
              <Link to={`/place/${result._id}`}>
                <div className="relative bg-gray-500 rounded-2xl overflow-hidden aspect-square">
                  {result.photos?.[0] && (
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={"http://localhost:4000/uploads/" + result.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{result.title}</h3>
                <p>{result.address}</p>
                <p>Price: NRP {result.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Scroll/>
    </>
  );
};

export default SearchResult;
