import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomFooter from '../../Footer/CustomFooter';
import axios from 'axios';

const URL = "http://localhost:5000/";

function Dashboard() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(URL);
                console.log("API response", response.data);
                setMovies(response.data.movie || []);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className='movie-container'>
                <h1>Welcome to the Dashboard</h1>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login', { replace: true });
                }}>
                    Logout
                </button>
            </div>

            {loading ? (
                <p>Loading Data...</p>
            ) : (
                <div className='movie-container'>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie._id} className='card'>
                                {movie.image && (
                                    <img
                                        src={`http://localhost:5000/${movie.image}`} 
                                        alt={movie.title}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                    />
                                )}
                                <h2>{movie.title}</h2>
                                <p>Year: {movie.year}</p>
                                <p>Status: {movie.status}</p>
                                <button
                                    className='updateBtn'
                                    onClick={() => navigate(`/rate/${movie._id}`, { state: movie })}
                                >
                                    Rate
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>
            )}

            <div style={{ marginTop: "auto" }}>
                <CustomFooter />
            </div>
        </div>
    );
}

export default Dashboard;
