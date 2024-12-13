const express = require('express');
const rateController = require('../controllers/rateController');

const router = express.Router();

router.get('/averageRate', rateController.getAverageRate);
router.get('/closingRate', rateController.getClosingRate);
router.post('/addCurrencyPair', rateController.addCurrencyPair);

module.exports = router;
