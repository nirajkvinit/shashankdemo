const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

//Create User Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  usersecret: {
    type: String,
    default: shortid.generate
  },
  isadmin: {
    type: String,
    default: "no"
  },
  emailverified: {
    type: String,
    default: "no"
  },
  verificationkey: {
    // Email verification key
    type: String,
    default: shortid.generate
  },
  recoverykey: {
    // password recovery key
    type: String,
    default: ""
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
