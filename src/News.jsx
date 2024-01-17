import React, { useState } from "react";
import axios from "axios";
import { hatch } from "ldrs";

const News = () => {
  // State
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Event handlers
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!searchQuery.trim()) {
      // If there's no valid search query, don't make the API call
      setNewsData([]);
      return;
    }
  
    setLoading(true);
  
    try {
      // Replace 'YOUR_NEWS_API_KEY' with your actual News API key
      const apiKey = "7a452bf296d64defa084823bb4d4f7ae";
      const newsApiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
  
      const response = await axios.get(newsApiUrl);
  
      // Check if articles exist in the response, otherwise, use an empty array
      const articles = response.data.articles || [];
  
      setNewsData(articles);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // JSX
  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search for news..."
        />
        &nbsp; <button type="submit">Search</button>
      </form>

      {loading && (
        <h2>
          {hatch.register()}
          <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch>
        </h2>
      )}

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div>
          {newsData.map((article, index) => (
            <div key={index} className="article-card">
              <h3>{article.title}</h3>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="News"
                  className="article-image"
                />
              )}
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;

// `http://hn.algolia.com/api/v1/search?query=react`
