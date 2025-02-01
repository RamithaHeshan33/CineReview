const express = require('express');
const userController = require('../Controllers/UserController'); // Correct import

const router = express.Router();

// Define user-related routes
router.get('/', userController.getAllUsers);
router.post('/register', userController.userRegister); // ✅ Now properly defined

module.exports = router;
