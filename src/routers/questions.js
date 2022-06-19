const express = require("express")
const userController = require("../controllers/QuestionController/QuestionController")
const router = express.Router()

router.get("/getAllQuestions", userController.getAllQuestions)
router.post("/addQuestion", userController.addQuestion)
// router.put("/updateQuestion", userController.updateQuestion)

module.exports = router;