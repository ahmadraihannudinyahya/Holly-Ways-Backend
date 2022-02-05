class Validation {
  async validateRegisterUserPayload() {
    throw new Error('Validation is abstract class');
  }

  async validateLoginUserPayload() {
    throw new Error('Validation is abstract class');
  }

  async validateNewFundPayload() {
    throw new Error('Validation is abstract class');
  }

  async validateEditFundPayload() {
    throw new Error('Validation is abstract class');
  }

  async validateNewDonationPayload() {
    throw new Error('Validation is abstract class');
  }
  
  async validateEditProfilePayload() {
    throw new Error('Validation is abstract class');
  }
}

module.exports = Validation;
