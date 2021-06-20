const userService = require("../services/userService");
const catchAsync = require("../errorHandler/catchAsync");

module.exports = {
  createUser: catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body);

    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  }),

  loginUser: catchAsync(async (req, res, next) => {
    const token = await userService.loginUser(req.body);
    return res
      .status(200)
      .json({ message: "User login successfully", data: token });
  }),
  getAllUsers: catchAsync(async (req, res, next) => {
    const users = await userService.getAllusers();
    return res.status(200).json({ message: "OK", data: users });
  }),
  getUserById: catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    return res.status(200).json({ message: "OK", data: user });
  }),
  deleteUser: catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const user = await userService.deleteUserById(_id);

    return res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully`, data: user });
  }),
};
