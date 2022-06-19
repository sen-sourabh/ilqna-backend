const express = require("express")
const categoryController = require("../controllers/CategoryController/CategoryController")
const router = express.Router()

router.get("/getAllCategories", categoryController.getAllCategories)
router.post("/addCategory", categoryController.addCategory)
router.put("/updateCategory", categoryController.updateCategory)

module.exports = router;