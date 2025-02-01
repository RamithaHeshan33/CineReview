const express = require('express');
const router = express.Router();
const RateController = require('../Controllers/RateController');

router.get('/', RateController.getAllRates);

module.exports = router;