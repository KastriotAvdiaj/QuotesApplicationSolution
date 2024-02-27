import React, { useState } from "react";
import "./SearchBar.css";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ placeholder, onSearch, inputValue, onInputChange }) => {
  // const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    // setInputValue(e.target.value);
    onInputChange(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        className="search-bar"
        value={inputValue}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
        <IoSearchOutline />
      </button>
    </div>
  );
};

export default SearchBar;
