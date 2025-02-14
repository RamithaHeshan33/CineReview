const express = require('express');
const router = express.Router();
const RateController = require('../Controllers/RateController');

router.get('/', RateController.getAllRates);
router.post('/rate', RateController.rateMovie);
router.get('/movie/:movieID', RateController.getRatesByMovieID);
router.get('/user/:userID', RateController.getRatesByUserID);

module.exports = router;