module.exports = (Joi) => ({
  RegisterUserPayloadSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullname: Joi.string().required(),
  }),
  LoginUserPayloadSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
