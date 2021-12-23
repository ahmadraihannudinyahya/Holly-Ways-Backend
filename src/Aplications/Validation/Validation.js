class Validation{
  validateRegisterUserPayload(payload){
    throw new Error('RegisterUserValidation is abstract class');
  }
}

module.exports = Validation;