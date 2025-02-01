// Importing necessary tools
import React, { useState } from 'react';  // We are using React to build the UI and 'useState' to manage data.
import { useNavigate } from 'react-router-dom';  // 'useNavigate' helps us go to different pages in the app.
import './Register.css';  // Import the CSS file to style the page.
import {motion} from 'framer-motion';  // 'framer-motion' is used for nice animations.

const REGISTER_URL = 'http://localhost:5000/users/register';  // This is the URL where we will send the registration data.

function Register() {
    // This is where we store the form data (like name, email, etc.)
    const [formData, setFormData] = useState({
        name: '',      // Empty value for name at the start
        email: '',     // Empty value for email at the start
        password: '',  // Empty value for password at the start
        phone: '',     // Empty value for phone at the start
    });

    const [error, setError] = useState('');  // This stores any error message if something goes wrong.
    const navigate = useNavigate();  // This helps us move to another page (like login) after registration.

    // This function is triggered when the user types in the input fields (like name, email).
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // This updates the formData with the new value typed in the input.
    };

    // This function handles the form submission (when the user clicks on the Register button).
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents the page from reloading when submitting the form.
        setError('');  // Clears any previous error messages before trying to register.

        try {
            // Sending the registration data (like name, email, password) to the server.
            const response = await fetch(REGISTER_URL, {
                method: 'POST',  // 'POST' means we are sending data to the server.
                headers: { 'Content-Type': 'application/json' },  // We are sending the data in JSON format.
                body: JSON.stringify(formData),  // Convert the formData into JSON format to send it.
            });

            // Getting the response from the server after registration attempt.
            const data = await response.json();  // Parse the response as JSON.

            // If the registration was successful, show a success message and navigate to the login page.
            if (response.ok) {
                alert('Registration Successful! Please log in.');
                navigate('/login');  // Redirect the user to the login page after success.
            } else {
                setError(data.message || 'Registration failed. Please try again.');  // If there is an error, show the message.
            }
        } catch (error) {
            // If something goes wrong, like a network issue, we show a generic error message.
            console.error('Error:', error);
            setError('Something went wrong. Try again later.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='Login'>
                {/* Left side of the page with animation */}
                <motion.div className='login-left'
                    initial={{ x: -100, opacity: 0 }}  // Start off-screen to the left and invisible
                    animate={{ x: 0, opacity: 1 }}  // Move into position and become visible
                    transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition animation
                >
                    <img src='res/reg.png' alt='reg' /> {/* Image on the left side */}
                </motion.div>

                {/* Right side of the page with animation */}
                <motion.div className='login-right'
                    initial={{ x: 100, opacity: 0 }}  // Start off-screen to the right and invisible
                    animate={{ x: 0, opacity: 1 }}  // Move into position and become visible
                    transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition animation
                >
                    <form onSubmit={handleSubmit} method='post'>  {/* Form to collect the registration data */}
                        <h1>User Registration</h1>  {/* Title of the form */}

                        {/* Input field for Name */}
                        <label>Name</label>
                        <input type='text' placeholder='Username' name='name' value={formData.name} onChange={handleChange} required />

                        {/* Input field for Email */}
                        <label>Email</label>
                        <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />

                        {/* Input field for Password */}
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />

                        {/* Input field for Phone */}
                        <label>Phone</label>
                        <input type='text' placeholder='Phone' name='phone' value={formData.phone} onChange={handleChange} required />

                        {/* If there's an error, show it */}
                        {error && <p className="error">{error}</p>}

                        {/* Button to submit the form */}
                        <button type='submit' className='addBtn'>Register</button>
                    </form>

                    {/* Link to go to the login page if the user already has an account */}
                    <p className='text'>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
                </motion.div>
            </div>
        </div>
    );
}

export default Register;  // Export the Register component so it can be used elsewhere in the app.
