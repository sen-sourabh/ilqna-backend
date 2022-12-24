const express = require("express")
const answerController = require("../controllers/AnswerController/AnswerController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.get("/getAllAnswers", AuthService.verfifyJWT, answerController.getAllAnswers)
router.get("/getAllAnswersCountOfUser", AuthService.verfifyJWT, answerController.getAllAnswersCountOfUser)
router.post("/addAnswer", AuthService.verfifyJWT, answerController.addAnswer)
router.put("/updateAnswer", AuthService.verfifyJWT, answerController.updateAnswer)

module.exports = router;