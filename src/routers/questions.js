const express = require("express")
const questionController = require("../controllers/QuestionController/QuestionController")
const router = express.Router()

router.get("/getAllQuestions", questionController.getAllQuestions)
router.post("/addQuestion", questionController.addQuestion)
router.put("/updateQuestion", questionController.updateQuestion)

module.exports = router;