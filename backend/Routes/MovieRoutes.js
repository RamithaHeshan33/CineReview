const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/MovieController');
const movieModel = require('../Models/MovieModels');

router.get('/', movieController.getAllMovies);
router.post('/add', movieController.addMovie);


module.exports = router;

