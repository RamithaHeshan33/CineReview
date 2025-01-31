const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./Routes/MovieRoutes');
const cors = require('cors');
const path = require('path'); // Import path module

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images from 'uploads' folder
app.use(cors());
app.use('/', router);

// Connect to DB
mongoose.connect("mongodb+srv://admin:IPPLJ26NbFbtkpkJ@cluster0.zyjul.mongodb.net/")
    .then(() => console.log('Connected to DB'))
    .then(() => { app.listen(5000); })
    .catch(err => console.log(err));
