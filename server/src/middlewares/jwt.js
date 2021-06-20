const jwt = require("jsonwebtoken");
const AppError = require("../errorHandler/AppError");
const { config } = require("dotenv");
const userService = require("../services/userService");

config();

exports.decode = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    throw new AppError("No access token provided", 400, "access-denied");
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    console.log("HAHA");
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    console.log("DEC", decoded);
    req.user = await userService.getUserById(decoded.userId);
    console.log("KKK");
    console.log(req.user);
    return next();
  } catch (error) {
    return new AppError(error.message, 401, "access-denied");
  }
};
