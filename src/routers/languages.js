const express = require("express")
const languageController = require("../controllers/LanguageController/LanguageController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.get("/getAllLanguages", AuthService.verfifyJWT, languageController.getAllLanguages)
router.post("/addLanguage", AuthService.verfifyJWT, languageController.addLanguage)
router.put("/updateLanguage", AuthService.verfifyJWT, languageController.updateLanguage)

module.exports = router;