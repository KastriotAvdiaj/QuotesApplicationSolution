import React, { useState } from "react";

const SearchBar = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue); // Call the onSearch function passed as a prop with the current input value
  };

  return (
    <div className="search-bar-container">
      <input type="text" placeholder={placeholder} className="search-bar" />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
