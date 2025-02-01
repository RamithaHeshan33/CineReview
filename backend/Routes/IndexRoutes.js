const express = require('express');
const userRoutes = require('./UserRoutes');
const movieRoutes = require('./MovieRoutes'); // ✅ Added MovieRoutes

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Movie routes
router.use('/', movieRoutes); // ✅ Now movie routes are included

module.exports = router;
