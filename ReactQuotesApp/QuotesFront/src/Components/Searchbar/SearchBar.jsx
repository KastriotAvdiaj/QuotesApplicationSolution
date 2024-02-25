import React from "react";
import "./SearchBar.css";

const SearchBar = ({ placeholder, onSearch }) => {
  return (

        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          className="search-bar"
        />
  );
};

export default SearchBar;
