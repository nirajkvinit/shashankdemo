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
  let returnUser = null;

  if (!isEmpty(user)) {
    returnUser = { ...user };
    Object.keys(returnUser).forEach(key => {
      if (keysToRemove.includes(key)) {
        delete returnUser[key];
      }
    });
  }

  return returnUser;
};

// get user from DB
const fetchUserFromDB = async email => {
  const returnData = messageFormat();

  if (isEmpty(email) || !Validator.isEmail(email)) {
    returnData.message = "Email address is empty or invalid";
  } else {
    try {
      let userData = await User.findOne({ email });

      returnData.message = "Fetched Data from db successfully!";
      returnData.isError = false;
      returnData.data = isEmpty(userData) ? null : userData.toObject();
    } catch (error) {
      returnData.message = "Error occured while fetching user";
      returnData.data = error;
    }
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

    // TODO: Send account creation cum email address verification email

    return returnData;
  } catch (error) {
    returnData.message = "User could not be created!";
    return returnData;
  }
};

module.exports = { fetchUserFromDB, createUser, cleanUserData };
