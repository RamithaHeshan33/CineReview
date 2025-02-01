const express = require('express');
const userRoutes = require('./UserRoutes');
const movieRoutes = require('./MovieRoutes'); // ✅ Added MovieRoutes
const rateRoutes = require('./RateRoutes');

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Rate routes
router.use('/rates', rateRoutes);

// Movie routes
router.use('/', movieRoutes); // ✅ Now movie routes are included

module.exports = router;
