const { Router } = require("express");
const userController = require("../controllers/userController");
const isValid = require("../middlewares/isValid");
const { decode } = require("../middlewares/jwt");
const userValidation = require("../validations/userValidation");

const router = Router();

router.post(
  "/register",
  isValid(userValidation.user, "body"),
  userController.createUser
);

router.post("/login", userController.loginUser);

router.get("/", decode, userController.getAllUsers);

router.get("/:id", decode, userController.getUserById);

router.delete("/", decode, userController.deleteUser);

module.exports = router;
