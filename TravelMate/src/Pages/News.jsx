import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      // Function to fetch news data from the server
      try {
        const response = await axios.get("/news");
        setNews(response.data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    // Call the fetchNews function when the component mounts
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center underline">
        Latest News
      </h2>
      <div className=" p-9 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Map through each news article and render it */}
        {news.map((article, index) => (
          <div key={article.article_id} className="mb-8">
            <div className="bg-white  shadow-md p-4 border border-primary rounded-2xl">
              <h3 className="text-xl font-semibold mb-2 ">{article.title}</h3>
              <p className="text-gray-600 mt-4 mb-2 text-justify">
                {article.description}
              </p>
              <img
                src={article.image_url}
                alt={article.title}
                className="rounded-md mb-2"
              />
              {/* Link to read more about the news article */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
