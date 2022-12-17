const express = require("express")
const questionController = require("../controllers/QuestionController/QuestionController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.get("/getAllQuestions", AuthService.verfifyJWT, questionController.getAllQuestions)
router.post("/addQuestion", AuthService.verfifyJWT, questionController.addQuestion)
router.put("/updateQuestion", AuthService.verfifyJWT, questionController.updateQuestion)

module.exports = router;