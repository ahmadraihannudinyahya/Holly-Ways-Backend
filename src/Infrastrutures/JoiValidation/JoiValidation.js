const schemaTemplate = require('./schemaTemplate');
const Validation = require('../../Aplications/Validation/Validation');
const InvariantError = require('../../Commons/Exceptions/InvariantError');

class JoiValidation extends Validation {
  constructor(Joi) {
    super();
    this.Joi = Joi;
    this.schema = schemaTemplate(Joi);
  }

  validateRegisterUserPayload(payload) {
    const validationResult = this.schema.RegisterUserPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
  validateLoginUserPayload(payload){
    const validationResult = this.schema.LoginUserPayloadSchema.validate(payload);
    if(validationResult.error){
      throw new InvariantError(validationResult.error.message);
    }
  }
}
module.exports = JoiValidation;
