const express = require('express');
const router = require('./Routes/IndexRoutes'); // ✅ Use IndexRoutes

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the index router
app.use('/', router);  // ✅ Now it handles both movies & users

// Connect to DB
mongoose.connect("mongodb+srv://admin:IPPLJ26NbFbtkpkJ@cluster0.zyjul.mongodb.net/")
    .then(() => console.log('Connected to DB'))
    .then(() => { app.listen(5000); })
    .catch(err => console.log(err));
