import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/searchbar.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const fetchData = (value) => {
    if (store.events.length === 0) {
      actions.getEvents();
    }

    const filteredResults = store.events.filter(
      (event) =>
        value &&
        (event?.title?.toLowerCase().includes(value.toLowerCase()) ||
          event?.description?.toLowerCase().includes(value.toLowerCase()) ||
          event?.location?.toLowerCase().includes(value.toLowerCase()) ||
          event?.type?.toLowerCase().includes(value.toLowerCase()))
    );

    setResults(filteredResults);
    setShowDropdown(filteredResults.length > 0);
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

  const handleSearchIconClick = () => {
    if (input.trim() !== "") {
      navigate(`/results?query=${encodeURIComponent(input)}`);
      setInput("");
      setShowDropdown(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchIconClick();
      setShowDropdown(false);
    }
  };
  

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <div className="input-wrapper">
        <input
          placeholder="Search..."
          value={input}
          onKeyDown={handleKeyDown} 
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowDropdown(results.length > 0)} 
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearchIconClick}
          style={{ cursor: "pointer" }}
        ></i>
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
