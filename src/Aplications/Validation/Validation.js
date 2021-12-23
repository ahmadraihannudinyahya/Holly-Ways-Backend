class Validation {
  validateRegisterUserPayload() {
    throw new Error('RegisterUserValidation is abstract class');
  }
  validateLoginUserPayload(){
    throw new Error('Validation is abstract class');
  }
}

module.exports = Validation;
