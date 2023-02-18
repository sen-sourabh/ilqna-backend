const express = require("express")
const categoryController = require("../controllers/CategoryController/CategoryController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.get("/getAllCategories", categoryController.getAllCategories)
router.post("/addCategory", categoryController.addCategory)
router.put("/updateCategory", AuthService.verfifyJWT, categoryController.updateCategory)

module.exports = router;