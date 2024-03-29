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
  NewFundPayloadSchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    goal: Joi.number().required(),
    thumbnail: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      buffer: Joi.required(),
      encoding: Joi.required(),
      mimetype: Joi.valid('image/jpeg', 'image/png').required(),
      size: Joi.number().max(4000000).required(),
    }).required(),
    token: Joi.string(),
  }),
  EditFundPayloadSchema: Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    goal: Joi.number(),
    thumbnail: {
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      buffer: Joi.required(),
      encoding: Joi.required(),
      mimetype: Joi.valid('image/jpeg', 'image/png').required(),
      size: Joi.number().max(4000000).required(),
    },
    token: Joi.string(),
  }),
  NewDonationPayloadSchema: Joi.object({
    donateAmount: Joi.number().required(),
    fundId: Joi.string(),
    proofAttachment: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      buffer: Joi.required(),
      encoding: Joi.required(),
      mimetype: Joi.valid('image/jpeg', 'image/png').required(),
      size: Joi.number().max(4000000).required(),
    }).required(),
    token: Joi.string(),
  }),

  editProfilePayloadSchema: Joi.object({
    fullname: Joi.string(),
    phone: Joi.number(),
    image: {
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      buffer: Joi.required(),
      encoding: Joi.required(),
      mimetype: Joi.valid('image/jpeg', 'image/png').required(),
      size: Joi.number().max(4000000).required(),
    },
    token: Joi.string(),
  }),
});
