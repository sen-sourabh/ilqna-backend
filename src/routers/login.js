const express = require('express');
const loginController = require('../controllers/LoginController/LoginController');
const AuthService = require('../services/Auth');
const router = express.Router();

router.post('/login', loginController.login);
router.post('/forgotPassword', loginController.forgotPassword);
router.post('/resetPassword', loginController.resetPassword);
router.post('/changePassword', AuthService.verfifyJWT, loginController.changePassword);

module.exports = router;
