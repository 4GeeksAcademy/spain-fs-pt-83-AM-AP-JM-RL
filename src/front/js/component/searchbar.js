import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/searchbar.css';


export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]); 
  const [showDropdown, setShowDropdown] = useState(false); 

  const { store, actions } = useContext(Context);

  const fetchData = async (value) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }
      const json = await response.json();
      const filteredResults = json.filter((event) =>
        value && event?.title?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
      setShowDropdown(filteredResults.length > 0);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  const handleInputChange = (value) => {
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleResultClick = () => {
    setInput(""); 
    setShowDropdown(false); 
  };

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <div className="input-wrapper">
        <input
          placeholder="Search..."
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowDropdown(results.length > 0)} 
        />
        <i className="fa-solid fa-magnifying-glass" />
      </div>

      {showDropdown && (
        <div className="dropdown">
          {results.length > 0 ? (
            results.map((event, index) => (
              <div key={index} className="dropdown-item">
                <Link to={`/events/${event.id}`} onClick={handleResultClick}>
                  {event.title}
                </Link>
              </div>
            ))
          ) : (
            <div className="dropdown-item">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
