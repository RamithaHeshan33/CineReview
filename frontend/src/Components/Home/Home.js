import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Home.css';
import Footer from '../Footer/CustomFooter';

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
      <h1 style={{textAlign: "center", fontSize: "1.5rem", fontWeight: "700"}}>Movie Details</h1>

      {/* Show loading message if data is being fetched */}
      {loading ? (
        <p>Loading Data...</p>
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


      <div style={{marginTop: "auto"}}>
        <Footer />
      </div>

    </div>
  );
}

export default Home;
