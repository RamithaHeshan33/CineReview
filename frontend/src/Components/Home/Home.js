import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Home.css';
import Footer from '../Footer/CustomFooter';
import { motion } from 'framer-motion';

const URL = "http://localhost:5000/"; // Updated endpoint

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(URL);
        console.log("API response", response.data);
        setMovies(response.data.movie || []);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <motion.div
          className='project'
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
      >

        <h1 style={{textAlign: "center"}}>Movie Details</h1>


      </motion.div>

      <motion.div 
          className='project'
          initial={{ y: -50, opacity: 0 }}  // Start slightly above
          animate={{ y: 0, opacity: 1 }}  // Move to normal position
          transition={{ 
              duration: 1, 
              // type: "spring", 
              stiffness: 150, 
              damping: 10 
          }}  // Spring physics for bounce effect
      >
        
        {/* Show loading message if data is being fetched */}
        {loading ? (
          <p className='home-load'>Loading Data...</p>
        ) : (
          <div className='movie-container'>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie._id} className='card'>
                  {movie.image && (
                    <img
                      src={`http://localhost:5000/${movie.image}`} // Display image from backend
                      alt={movie.title}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // Placeholder if image fails to load
                    />
                  )}
                  <h2>{movie.title}</h2>
                  <p>Year: {movie.year}</p>
                  <p>Status: {movie.status}</p>
                </div>
              ))
            ) : (
              <p>No movies available</p>
            )}
          </div>
        )}

      </motion.div>


      <div style={{marginTop: "auto"}}>
        <Footer />
      </div>

    </div>
  );
}

export default Home;
