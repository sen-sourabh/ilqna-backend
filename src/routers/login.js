const express = require("express")
const loginController = require("../controllers/LoginController/LoginController")
const router = express.Router()

router.get("/login", loginController.login)

module.exports = router;