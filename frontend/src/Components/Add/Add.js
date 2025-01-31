import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import CustomFooter from '../Footer/CustomFooter';
import axios from 'axios';  // Import axios
import './Add.css';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/add';

function Add() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: '',
    year: '',
    status: '',
    image: null,
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      image: e.target.files[0],  // Save the selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(movie);
    await sendReqest();
    navigate('/');
  };

  // Send the request to the server with FormData
  const sendReqest = async () => {
    try {
      const formData = new FormData();
      formData.append('title', movie.title);
      formData.append('year', movie.year);
      formData.append('status', movie.status);
      formData.append('image', movie.image);  // Append the image

      // Send the form data as multipart/form-data
      await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set the content type to multipart/form-data
        },
      });

      alert('Movie added successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to add movie');
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />

      <div className='add-container'>
        <div className='left'>
          <img src='./res/add.png' alt='add' />
        </div>

        <div className='right'>
          <h1>Add Movie</h1>
          <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={movie.title}
              onChange={handleChange}
            />

            <label>Year: </label>
            <input
              type='text'
              name='year'
              placeholder='Year'
              value={movie.year}
              onChange={handleChange}
            />

            <label>Status: </label>
            <input
              type='text'
              name='status'
              placeholder='Status'
              value={movie.status}
              onChange={handleChange}
            />

            <label>Image: </label>
            <input type='file' onChange={handleImageChange} />

            <button type='submit' className='addBtn'>Add Movie</button>
          </form>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <CustomFooter />
      </div>
    </div>
  );
}

export default Add;
