import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RateMovie.css';
import CustomFooter from '../../Footer/CustomFooter';

function RateMovie() {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state;
    const user = JSON.parse(localStorage.getItem('user'));

    // State for comment, rating, and modals
    const [comment, setComment] = useState('');
    const [rating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [loadingRatings, setLoadingRatings] = useState(false);
    const [modalType, setModalType] = useState(null); // 'rate' or 'view'

    // Fetch movie ratings
    const fetchRatings = useCallback(async () => {
        if (!movie?._id) return;
        
        setLoadingRatings(true);
        try {
            const response = await fetch(`http://localhost:5000/rates/movie/${movie._id}`);
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setRatings(data);
            } else if (Array.isArray(data.ratings)) {
                setRatings(data.ratings);
            } else {
                console.error('Received invalid ratings format:', data);
                setRatings([]);
            }
        } catch (error) {
            console.error('Error fetching ratings:', error);
            setError('Server error: ' + error.message);
        } finally {
            setLoadingRatings(false);
        }
    }, [movie?._id]); // Only recreate if movie ID changes

    // Use useEffect with proper dependencies
    useEffect(() => {
        if (modalType === 'view') {
            fetchRatings();
        }
    }, [modalType, fetchRatings]);

    // Handle rating submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/rates/rate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    movie: movie._id,
                    user: user._id,
                    comment,
                    rating
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Rating submitted successfully!');
                setModalType(null);
                setComment(''); // Reset comment after successful submission
                await fetchRatings(); // Refresh ratings
            } else {
                setError(data.message || 'Error submitting rating');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            setError('Server error: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Early return for authentication and data validation
    if (!user) {
        return (
            <div className="error-container">
                <p className="error-message">You must be logged in to rate a movie.</p>
                <button onClick={() => navigate('/login')} className="back-button">
                    Go to Login
                </button>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="error-container">
                <p className="error-message">Movie details not found!</p>
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <h1 className='mb-5 mt-5 rate-header'>Rate {movie.title}</h1>
            <div className='rate-container'>
                <div className='rate-left'>
                    {movie.image && (
                        <img
                            className='rate-image'
                            src={`http://localhost:5000/${movie.image}`}
                            alt={movie.title}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                        />
                    )}
                    <button onClick={() => navigate(-1)} className="back-button">← Back</button>
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
                            <p className='des-con-v'>{movie.status}</p>
                        </div>
                        <div className='below-description-content'>
                            <p className='des-con-p'><strong>Director:</strong></p>
                            <p className='des-con-v'>Duffer Bros</p>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className='rateBtn' onClick={() => setModalType('rate')}>Rate</button>
                        <button className='rateBtn' onClick={() => setModalType('view')}>View Ratings</button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <CustomFooter />
            </div>

            {/* Modal for Rating */}
            {modalType === 'rate' && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Rate {movie.title}</h2>
                        {error && <p className='error-message'>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>User:</label>
                                <input type='text' value={user.name} readOnly className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Movie:</label>
                                <input type='text' value={movie.title} readOnly className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Comment:</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    className="form-textarea"
                                />
                            </div>

                            <div className="modal-buttons">
                                <button 
                                    type='submit' 
                                    disabled={isSubmitting}
                                    className="submit-button"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                                <button 
                                    type='button' 
                                    onClick={() => setModalType(null)}
                                    className="close-button"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Viewing Ratings */}
            {modalType === 'view' && (
                <div className='modal'>
                    <div className='view-modal-content'>
                        <h2>Ratings for {movie.title}</h2>
                        {loadingRatings ? (
                            <p>Loading ratings...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            <div className="ratings-container">
                                {ratings && ratings.length > 0 ? (
                                    ratings.map((rating) => (
                                        <div key={rating._id} className='rating-item'>
                                            <p><strong>User ID:</strong> {rating.user}</p>
                                            <p><strong>Date:</strong> {new Date(rating.createdAt).toLocaleDateString()}</p>
                                            <p><strong>Comment:</strong> {rating.comment}</p>
                                            {/* <hr /> */}
                                        </div>
                                    ))
                                ) : (
                                    <p>No ratings available yet.</p>
                                )}
                            </div>
                        )}
                        <button 
                            type='button' 
                            onClick={() => setModalType(null)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RateMovie;