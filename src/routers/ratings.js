const express = require("express")
const ratingController = require("../controllers/RatingController/RatingController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.post("/addRating", AuthService.verfifyJWT, ratingController.addRating)

module.exports = router;