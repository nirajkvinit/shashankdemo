const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { getLogger, isEmpty } = require("../../utils");
const logger = getLogger("routes/v1api/users");

//load input validation for register route
const validateRegisterInput = require("../../validation/register");

//Load User Model
const User = require("../../models/User");

// @route   POST api/users/signup
// @desc    Register User route
// @access  Public
router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  /**
   * Check for user based on given email address
   * if it's available then save the artifact in that user's account
   * else create the user and then save the artifact in that user's account
   */
});

module.exports = router;
