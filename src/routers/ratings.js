const express = require('express');
const ratingController = require('../controllers/RatingController/RatingController');
const AuthService = require('../services/Auth');
const router = express.Router();

router.post('/updateRating', AuthService.verfifyJWT, ratingController.updateRating);

module.exports = router;
