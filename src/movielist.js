import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const MovieList = ({ movies }) => {
  const [movieDetails, setMovieDetails] = useState([]);

  async function fetchMovieDetails(movieId) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  }
  useEffect(() => {
    const fetchMovieDetailsWithRatings = async () => {
      const detailsPromises = movies.map((movie) => fetchMovieDetails(movie.id));
      const movieDetails = await Promise.all(detailsPromises);
      setMovieDetails(movieDetails);
    };

    fetchMovieDetailsWithRatings();
  }, [movies]); // Re-fetch details when movies prop changes


  return (
    <div className='movies'>
    <h1>MOVIES</h1>
    <div className="movie-list">
    <div className="movie-row">
      {movieDetails.map((movie) => (
        <div key={movie.id}  className="movie">
          <h2>Title: {movie.title}</h2>
          <div className='space'></div>
          <div className='moviedet1'><center>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          </center>
          </div>
          <div className='moviedet2'>
          {movie.overview && <p>{movie.overview}</p>} 
          <p>Rating: {movie.vote_average}</p> 
          <p>Release Date: {movie.release_date}</p>
        </div> 
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default MovieList;


