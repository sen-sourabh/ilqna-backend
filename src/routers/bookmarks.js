const express = require("express")
const bookmarkController = require("../controllers/BookmarkController/BookmarkController")
const AuthService = require("../services/Auth")
const router = express.Router()

router.post("/updateBookmark", AuthService.verfifyJWT, bookmarkController.updateBookmark)

module.exports = router;