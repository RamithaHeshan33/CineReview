import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import CustomFooter from '../Footer/CustomFooter';
import './Search.css';
import axios from 'axios';
import { motion } from 'framer-motion';

// Define the backend API URL
const URL = 'http://localhost:5000/';

function Search() {
  const [movies, setMovies] = useState([]); // State to store movie data
  const [search, setSearch] = useState(''); // State to store the search query

  useEffect(() => {
    // Function to fetch movies from the backend
    const fetchMovies = async () => {
      try {
        const response = await axios.get(URL); // API call to backend
        console.log('API Response:', response.data);

        // Fix: Ensure the correct key is used based on the API response
        setMovies(response.data.movie || []); // Update state with movie data
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies(); // Call the function when the component mounts
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.year.toString().includes(search) ||
    movie.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <motion.div
          className='project'
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
      >

        <div className='search-input'>
          <h1 className='search-title'>Search Movie</h1>
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='search-box'
          />
        </div>

      </motion.div>

      <motion.div 
          className='project'
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
              duration: 1, 
              // type: "spring", 
              stiffness: 150, 
              damping: 10 
          }}
      >

        <div className='movie-container'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie._id} className='card'>
                <img
                  src={`http://localhost:5000/${movie.image}`} // Display image from backend
                  alt={movie.title}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // Placeholder if image fails to load
                />
                <h2>{movie.title}</h2>
                <p>Year: {movie.year}</p>
                <p>Status: {movie.status}</p>
              </div>
            ))
          ) : (
            <p className='no-movies'>No movies available</p>
          )}
        </div>

      </motion.div>

      <div style={{marginTop: "auto"}}>
        <CustomFooter />
      </div>
    </div>
  );
}

export default Search;
