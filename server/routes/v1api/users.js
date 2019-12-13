const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const {
  getLogger,
  isEmpty,
  messageFormat,
  getUserSecret,
  jwtSigner
} = require("../../utils");
const logger = getLogger("routes/v1api/users");

//load input validation for register route
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const emailVerificationValidation = require("../../validation/emailverification");
const validateForgotPasswdInput = require("../../validation/forgotpassword");

//Load User Model
const User = require("../../models/User");

const {
  fetchUserFromDB,
  createUser,
  cleanUserData
} = require("../../controllers/UserController");

const { createArtifact } = require("../../controllers/ArtifactController");

const uploadDir = process.env.UPLOAD_DIR;

const upload = multer({
  dest: uploadDir,
  limits: {
    fieldSize: 8 * 1024 * 1024
  }
});

// @route   POST api/v1/user/signup
// @desc    Register User route
// @access  Public
router.post("/signup", upload.single("artifactfile"), async (req, res) => {
  const returnData = messageFormat();

  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  /**
   * Check for user based on given email address
   * if it's available then save the artifact in that user's account
   * else create the user and then save the artifact in that user's account
   */
  let foundUser = null;

  foundUser = await fetchUserFromDB(req.body.email);

  if (foundUser.isError) {
    errors.email = "Error fetching user of given email address";
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  // if user is empty create user
  if (isEmpty(foundUser.data)) {
    logger.info("User information is not available in the system");
    foundUser = await createUser(req.body.email);
  }

  // check again whether the user account got created or not!
  if (foundUser.isError || isEmpty(foundUser.data)) {
    errors.email = "Account could not be created for given email address";
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  // create artifact
  let artifactData = { ...req.body };

  if (!isEmpty(req.file)) {
    artifactData.file = req.file;
  }

  let artifactCreateResult = await createArtifact(
    foundUser.data.id,
    artifactData
  );

  //check whether artifact got create or not
  if (artifactCreateResult.isError) {
    returnData.isError = false;
    returnData.message =
      "Your account got created successfully, but your information could not be saved!";
    returnData.data = cleanUserData(foundUser.data);
    return res.json(returnData);
  } else {
    returnData.isError = false;
    returnData.message = "Your information was saved successfully!";
    returnData.data = cleanUserData(foundUser.data);
    return res.json(returnData);
  }
});

// @route   GET api/v1/users/signin
// @desc    login User route / Returning JWT Token
// @access  Public
router.post("/signin", async (req, res) => {
  const returnData = messageFormat();
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  let foundUser = null;
  let isPasswordMatched = false;

  // check validation
  if (!isValid) {
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  try {
    foundUser = await User.findOne({ email });

    if (isEmpty(foundUser)) {
      errors.email =
        "No user with this email address was found! Please check your email and try again";
      returnData.data = errors;
      return res.status(404).json({ ...returnData });
    }
  } catch (error) {
    logger.error(error);
    errors.email = "Error occured while signing user";
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  // check for password
  try {
    isPasswordMatched = await bcrypt.compare(password, foundUser.password);
  } catch (error) {
    logger.error(error);
  }

  if (!isPasswordMatched) {
    errors.password = "Password is incorrect!";
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  if (foundUser.emailverified !== "yes") {
    // TODO: Send automatic email address verification reminder email
  }

  // User found, password matched Create and return JWT Payload
  let payload = cleanUserData(foundUser);
  let userSecret = getUserSecret(foundUser);

  try {
    let token = await jwtSigner(
      payload,
      userSecret,
      process.env.TOKEN_EXPIRY_TIME
    );

    returnData.isError = false;
    returnData.message = "Signed in uccessfully!";
    returnData.data = token;
    return res.json(returnData);
  } catch (error) {
    logger.error(error);
    errors.password = "Signin token could not be created!";
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }
});

// @route   POST api/v1/users/verify
// @desc    Route to verify user's email
// @access  Public
router.post("/verify", async (req, res) => {
  const returnData = messageFormat();
  const { errors, isValid } = emailVerificationValidation(req.body);
  const { verificationkey } = req.body;
  let foundUser = null;

  // check validation
  if (!isValid) {
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  try {
    foundUser = await User.findOne({ verificationkey });
  } catch (error) {
    logger.error(error);
  }

  if (isEmpty(foundUser)) {
    errors.message = "Verification key is invalid! User not found!";
    returnData.data = errors;
    return res.status(404).json({ ...returnData });
  }

  try {
    foundUser.emailverified = "yes";

    await foundUser.save();

    // TODO: Send Email account verification success email.

    returnData.isError = false;
    returnData.message = "Your account was verified successfully!";
    return res.json({ ...returnData });
  } catch (error) {
    logger.error(error);
    errors.message = "Your account could not be verified! Please try again!";
    returnData.data = errors;
    return res.status(404).json({ ...returnData });
  }
});

// @route   POST api/v1/users/passwdrecovery
// @desc    Route for sending password recovery email
// @access  Public
// TODO: Incomplete code
router.post("/passwdrecovery", async (req, res) => {
  const returnData = messageFormat();
  const { errors, isValid } = validateForgotPasswdInput(req.body);
  const { email } = req.body;
  let foundUser = null;

  // check validation
  if (!isValid) {
    returnData.data = errors;
    return res.status(400).json({ ...returnData });
  }

  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    logger.error(error);
  }

  if (isEmpty(foundUser)) {
    errors.email = "Email does not exists";
    returnData.data = errors;
    return res.status(404).json({ ...returnData });
  }

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // check for user
      if (!user) {
        errors.email = "Email does not exists";
        res.status(404).json(errors);
      } else {
        // create a random string
        // save or update in the database as password recovery key
        // send email
        // return the success message
        sendForgotPasswordEmail.sendForgotPasswordEmail(user, req);
        res.json({
          success:
            "Password recovery email has been sent to your email address! Please follow the instruction in the email."
        });
      }
    })
    .catch(err => {
      logger.error(err);
      res.status(400).json("Error occured!");
    });

  // res.json({ message: "Success!" });
});

// @route   POST api/v1/users/updatepassword
// @desc    Update password
// @access  Public
// TODO:    Update  route

// @route   GET api/users/current
// @desc    return current user information
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json(cleanUserData(req.user))
);

module.exports = router;
