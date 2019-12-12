const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const { getLogger, isEmpty, messageFormat } = require("../../utils");
const logger = getLogger("routes/v1api/users");

//load input validation for register route
const validateRegisterInput = require("../../validation/register");

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

// @route   POST api/users/signup
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

module.exports = router;
