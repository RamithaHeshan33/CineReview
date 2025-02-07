const express = require('express');
const userController = require('../Controllers/UserController'); // Correct import
// const authMiddleware = require('../Middlewares/authMiddleware'); // Correct import

const router = express.Router();

// Define user-related routes
router.get('/', userController.getAllUsers);
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

// Define protected route
// router.get('/me', userController.getUser);


module.exports = router;
