import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'; 

const LOGIN_URL = 'http://localhost:5000/user/login'; // Corrected endpoint

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value.trim() // Trim whitespace
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT token
                alert('Login Successful!');
                navigate('/dashboard');
            } else {
                setError(data.message || 'Invalid Email or Password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Try again later.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='Login'>
              <motion.div className='login-left'
                    initial={{ x: -100, opacity: 0 }}  // Start off-screen to the left and invisible
                    animate={{ x: 0, opacity: 1 }}  // Move into position and become visible
                    transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition animation
              >
                <div className='login-left'>
                    <img src='res/login.png' alt='student' />
                </div>
              </motion.div>

                <div className='login-right'>
                  <motion.div className='login-right'
                      initial={{ x: 100, opacity: 0 }}  // Start off-screen to the right and invisible
                      animate={{ x: 0, opacity: 1 }}  // Move into position and become visible
                      transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition animation
                  >

                    <form onSubmit={handleSubmit}>
                        <h1>Student Login</h1>

                        <label>Email</label>
                        <input type='email' placeholder='Email' name='email' 
                                value={formData.email} onChange={handleChange} required />

                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' 
                                value={formData.password} onChange={handleChange} required />

                        {error && <p className="error">{error}</p>}

                        <button type='submit' className='addBtn'>Login</button>
                    </form>

                    <p className='text'>
                        Don't have an account? <button onClick={() => navigate('/register')}>Register</button>
                    </p>

                  </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Login;