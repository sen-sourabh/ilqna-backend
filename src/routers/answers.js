const express = require("express")
const answerController = require("../controllers/AnswerController/AnswerController")
const router = express.Router()

router.get("/getAllAnswers", answerController.getAllAnswers)
router.post("/addAnswer", answerController.addAnswer)
router.put("/updateAnswer", answerController.updateAnswer)

module.exports = router;