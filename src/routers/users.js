const express = require("express")
const userController = require("../controllers/UserController/UserController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.get("/getAllUsers", AuthService.verfifyJWT, userController.getAllUsers)
router.post("/addUser", userController.addUser)
router.put("/updateUser", AuthService.verfifyJWT, userController.updateUser)

module.exports = router;