import React, { useState } from "react";

const SearchBar = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the state with the new input value
  };

  const handleSearchClick = () => {
    onSearch(inputValue); // Call the onSearch function passed as a prop with the current input value
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholder}
        className="search-bar"
        value={inputValue}
        onChange={handleInputChange} // Update the input value on change
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
