const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../controllers/weatherController');

// GET /api/weather?city=Ahmedabad&unit=metric
router.get('/', getCurrentWeather);

// GET /api/weather/forecast?city=Ahmedabad&unit=metric
router.get('/forecast', getForecast);

module.exports = router;
