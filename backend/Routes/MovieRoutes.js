const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/MovieController');
const movieModel = require('../Models/MovieModels');

router.get('/', movieController.getAllMovies);
router.post('/add', movieController.addMovie);
router.get('/:id', movieController.getMovieById);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


module.exports = router;

