import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RateMovie.css';

function RateMovie() {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state;

    if (!movie) {
        return <p>Movie details not found!</p>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <h1 className='mb-5 mt-5 rate-header'>Rate {movie.title}</h1>
            <div className='rate-container'>
                <div className='rate-left'>
                    {movie.image && (
                        <img
                            className='rate-image'
                            src={`http://localhost:5000/${movie.image}`}
                            alt={movie.title}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                        />
                    )}
                </div>

                <div className='rate-right'>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Status:</strong> {movie.status}</p>

                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default RateMovie;
