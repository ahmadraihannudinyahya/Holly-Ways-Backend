class RegisterUserValidation{
  validateRegisterUserPayload(payload){
    throw new Error('RegisterUserValidation is abstract class');
  }
}

module.exports = RegisterUserValidation;