const Validator = require("validator");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { isEmpty, getLogger, messageFormat } = require("../utils");
const logger = getLogger("User Controller");

const cleanUserData = user => {
  let keysToRemove = [
    "password",
    "isadmin",
    "emailverified",
    "verificationkey",
    "recoverykey",
    "created"
  ];

  if (!isEmpty(user)) {
    Object.keys(user).forEach(key => {
      if (keysToRemove.includes(key)) {
        delete user[key];
      }
    });
  }

  return user;
};

// get user from DB
const fetchUserFromDB = async email => {
  const returnData = messageFormat();

  if (isEmpty(email) || !Validator.isEmail(email)) {
    returnData.message = "email address is empty or invalid";
    return returnData;
  }

  let userData = null;

  try {
    userData = await User.findOne({ email });

    returnData.message = "Fetched Data from db successfully!";
    returnData.isError = false;
    returnData.data = isEmpty(userData) ? null : userData.toObject();
  } catch (error) {
    returnData.message = "Error occured while fetching user";
    returnData.data = error;
  }

  return returnData;
};

const createUser = async email => {
  const returnData = messageFormat();

  if (isEmpty(email) || !Validator.isEmail(email)) {
    returnData.message = "email address is empty or invalid";
    return returnData;
  }

  let salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(shortid.generate(), salt);

  const newUser = new User({
    email,
    password
  });

  try {
    let createdUser = await newUser.save();

    returnData.message = "User created!";
    returnData.isError = false;
    returnData.data = createdUser;

    // TODO: Send account creation cum email verification email

    return returnData;
  } catch (error) {
    returnData.message = "User could not be created!";
    return returnData;
  }
};

module.exports = { fetchUserFromDB, createUser, cleanUserData };
