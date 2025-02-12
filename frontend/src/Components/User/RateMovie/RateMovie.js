import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RateMovie.css';
import CustomFooter from '../../Footer/CustomFooter';

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
                    <button onClick={() => navigate(-1)}>← Back</button>

                </div>

                <div className='rate-right'>
                    <p className='mb-5 text-xl'>{movie.description}</p>

                    <div className='below-description'>
                        <div className='below-description-content'>
                            <p className='des-con-p'><strong>Year:</strong></p>
                            <p className='des-con-v'>{movie.year}</p>
                        </div>

                        <div className='below-description-content'>
                            <p className='des-con-p'><strong>Status:</strong></p>
                            <p className='des-con-v'> {movie.status}</p>
                        </div>

                        {/* <div className='below-description-content'>
                            <p className='des-con-p'><strong>Director:</strong></p>
                            <p className='des-con-v'> {movie.status}</p>
                        </div> */}

                        <div className='below-description-content'>
                            <p className='des-con-p'><strong>Director:</strong></p>
                            <p className='des-con-v'> Duffer Bros</p>
                        </div>
                    </div>
                    
                    <button className='rateBtn' onClick={() => navigate(-1)}>Rate</button>
                </div>
            </div>

            <div style={{ marginTop: "auto" }}>
                <CustomFooter />
            </div>
        </div>
    );
}

export default RateMovie;
