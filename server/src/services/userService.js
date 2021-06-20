const AppError = require("../errorHandler/AppError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

exports.createUser = async (newUser) => {
  const user = await this.getUserByUsername(newUser.username);

  if (user) {
    throw new AppError("User already exist", 400, "already-exist");
  }

  return User.create(newUser);
};

exports.loginUser = async (loginUser) => {
  const { username, password } = loginUser;
  const user = await this.getUserByUsername(username);

  if (user.password !== password) {
    throw new AppError("Password invalid", 400, "invalid-credentials");
  }

  const payload = {
    userId: user._id,
  };

  const authToken = jwt.sign(payload, process.env.SECRET_KEY);

  return authToken;
};

exports.getUserByUsername = async (username) => {
  const user = await User.findOne({ username });

  return user;
};

exports.getAllusers = async () => {
  return User.find({}).populate("createdGroup");
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(`User with id ${userId} not found`, 400, "not-found");
  }
  return user;
};

exports.deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError(`User with id ${userId} not found`, 400, "not-found");
  }
  return user;
};
