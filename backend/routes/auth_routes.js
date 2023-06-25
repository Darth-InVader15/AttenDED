// This route is responsible for handling signIn, SignUp, and signOut

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth_controller');

// SignUp Route
router.post('/signup', authController.signup)

// SignIn Route
router.post('/signin', authController.signin)

module.exports = router;