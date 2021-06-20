const Joi = require("joi");

exports.user = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
