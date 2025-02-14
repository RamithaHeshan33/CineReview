import React, { useEffect, useState } from 'react';
import './Update.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/CustomFooter';
import axios from 'axios';
import { Modal, TextInput, Button } from 'flowbite-react';
import { motion } from 'framer-motion';

const URL = 'http://localhost:5000';

function Update() {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        year: '',
        status: '',
        description: '',
        image: ''
    });

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

    const handleUpdate = async () => {
        if (!selectedMovie) return;
        try {
            const response = await axios.put(`${URL}/${selectedMovie._id}`, updatedData);
            console.log('API Response:', response.data);
            setMovies(movies.map((movie) => 
                movie._id === selectedMovie._id ? { ...movie, ...updatedData } : movie
            ));
            setModalOpen(false);
            alert('Movie updated successfully');
        } catch (err) {
            console.error('Error updating movie:', err);
        }
    };

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setUpdatedData({
            title: movie.title,
            year: movie.year,
            status: movie.status,
            description: movie.description,
            image: movie.image
        });
        setModalOpen(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Nav />

            <motion.div
                className='project'
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <h1 style={{ textAlign: "center" }}>Update Movie</h1>
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
                                {/* <p>Description: {movie.description}</p> */}
                                <button className='updateBtn' onClick={() => handleOpenModal(movie)}>Update</button>
                            </div>
                        ))
                    ) : (
                        <p className='no-movies'>No movies available</p>
                    )}
                </div>
            </motion.div>


            {modalOpen && selectedMovie && (
                <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
                    {/* <Modal.Header className='update-title text-3xl font-bold text-center text-gray-800'>Update Movie</Modal.Header> */}
                    <Modal.Body className='update-modal'>
                        <div className="flex flex-col gap-4">
                            <label className='label'>Title</label>
                            <TextInput
                                value={updatedData.title}
                                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                            />
                            <label className='label'>Year</label>
                            <TextInput
                                value={updatedData.year}
                                onChange={(e) => setUpdatedData({ ...updatedData, year: e.target.value })}
                            />
                            <label className='label'>Status</label>
                            <TextInput
                                value={updatedData.status}
                                onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                            />
                            <label className='label'>Image URL</label>
                            <TextInput
                                value={updatedData.image}
                                onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
                                required={true}
                            />
                            <label className='label'>Description</label>
                            <TextInput
                                value={updatedData.description}
                                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='update-modal'>
                        <Button color="gray" onClick={() => setModalOpen(false)}>Close</Button>
                        <Button color="purple" onClick={handleUpdate}>Update</Button>
                    </Modal.Footer>
                </Modal>
            )}

            
            <div style={{ marginTop: "auto" }}>
                <Footer />
            </div>
        </div>
    );
}

export default Update;
