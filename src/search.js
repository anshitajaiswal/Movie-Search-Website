import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <div className="search" style={{ backgroundImage: "url('./movie1.png')" }}>

    <form onSubmit={handleSubmit}>
      
      <label htmlFor="search">Search Movies: </label>
      
      <div className="search-input">
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      </div>
      <button type="submit">Search</button>
    </form>
    </div>
  );
};

export default Search;
