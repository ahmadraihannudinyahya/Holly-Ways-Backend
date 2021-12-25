class Validation {
  validateRegisterUserPayload() {
    throw new Error('RegisterUserValidation is abstract class');
  }

  validateLoginUserPayload() {
    throw new Error('Validation is abstract class');
  }

  validateNewFundPayload() {
    throw new Error('Validation is abstract class');
  }

  validateEditFundPayload() {
    throw new Error('Validation is abstract class');
  }

  validateNewDonationPayload() {
    throw new Error('Validation is abstract class');
  }
}

module.exports = Validation;
