const Validation = require('../../Aplications/Validation/Validation');
const InvariantError = require('../../Commons/Exceptions/InvariantError');

class JoiValidation extends Validation{
  constructor(schema){
    this.schema = schema;
  }
  validateRegisterUserPayload(payload){
    const validationResult = this.schema.RegisterUserPayloadSchema.validate(payload);
    if(validationResult.error){
      throw new InvariantError(validationResult.error.message);
    }
  }
}
module.exports = JoiValidation;