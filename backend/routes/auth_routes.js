// This route is responsible for handling signIn, SignUp, and signOut

var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/auth_controller");

// SignUp Route
router.post(
  "/signup",
  [
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  authController.signup
);

// SignIn Route
router.post("/signin", authController.signin);

module.exports = router;
