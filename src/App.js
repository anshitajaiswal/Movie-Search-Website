import React, { useState, useEffect } from 'react';
import Search from './search';
import MovieList from './movielist';
import axios from 'axios';
import './style.css';
import Heart from './Heart';

require('dotenv').config(); // Load environment variables (optional)

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const apiKey = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY'; // Use environment variable or default
  const [heartsFilled, setHeartsFilled] = useState(Array(5).fill(false));

  const fillHearts = () => {
    let heartsCopy = [...heartsFilled]; // Copy the hearts state
    for (let i = 0; i < heartsCopy.length; i++) {
      setTimeout(() => {
        heartsCopy[i] = true;
        setHeartsFilled(heartsCopy);
      }, i * 500); // Delay each heart fill by 0.5 seconds
    }
  };

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`;
    axios.get(url)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fillHearts();
    // Optional: Fetch some default movies on app load
    // handleSearchSubmit('popular'); // Uncomment to fetch popular movies on load
  }, []);

  return (
    <div>
    <div className="App">
      <h1>Movie Search</h1>
      <Search onSearchSubmit={handleSearchSubmit} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
    <div className="heart-container">
    {heartsFilled.map((filled, index) => (
      <Heart key={index} filled={filled} /> // Pass filled prop to each Heart
    ))}
  </div>
  </div>
  );
};

export default App;
