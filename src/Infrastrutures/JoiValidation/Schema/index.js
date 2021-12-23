const Joi = require('joi');
module.exports = {
  RegisterUserPayloadSchema : Joi.object({
    email: Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    fullname: Joi.string().required(),
  }),
}