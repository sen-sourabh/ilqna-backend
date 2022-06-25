const express = require("express")
const languageController = require("../controllers/LanguageController/LanguageController")
const router = express.Router()

router.get("/getAllLanguages", languageController.getAllLanguages)
router.post("/addLanguage", languageController.addLanguage)
router.put("/updateLanguage", languageController.updateLanguage)

module.exports = router;