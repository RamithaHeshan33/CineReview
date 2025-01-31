import React, { useEffect, useState } from 'react'
import './Delete.css'
import Nav from '../Nav/Nav'
import Footer from '../Footer/CustomFooter'
import axios from 'axios';

const URL = 'http://localhost:5000';

function Delete() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(URL);
                console.log('API Response:', response.data);
                setMovies(response.data.movie || []);
            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };
        fetchMovies();
    }, []);

    const handleDelete = async(id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            // Show confirmation before deleting
            try {
              await axios.delete(`${URL}/${id}`); // Send DELETE request to API
              alert("Movie deleted successfully!");
              window.location.reload(); // Refresh page to update list
            } catch (err) {
              console.error("Delete error:", err);
              alert("Failed to delete movie.");
            }
          }
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Nav />

        <h1 style={{textAlign: "center"}}>Delete Movie</h1>
        <div className='movie-container'>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <div key={movie._id} className='card'>
                        <img
                            src={`http://localhost:5000/${movie.image}`}
                            alt={movie.title}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                        />
                        <h2>{movie.title}</h2>
                        <p>Year: {movie.year}</p>
                        <p>Status: {movie.status}</p>
                        <button className='updateBtn' onClick={() => handleDelete(movie._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p className='no-movies'>No movies available</p>
            )}
        </div>

        <div style={{marginTop: "auto"}}>
            <Footer />
        </div>
    </div>
  )
}

export default Delete