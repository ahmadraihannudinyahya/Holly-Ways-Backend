/* istanbul ignore file */
const Validation = require('../Validation');

describe('Validation test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const validation = new Validation();
    await expect(validation.validateRegisterUserPayload()).rejects.toThrowError('Validation is abstract class');
    await expect(validation.validateLoginUserPayload()).rejects.toThrowError('Validation is abstract class');
    await expect(validation.validateNewFundPayload()).rejects.toThrowError('Validation is abstract class');
    await expect(validation.validateEditFundPayload()).rejects.toThrowError('Validation is abstract class');
    await expect(validation.validateNewDonationPayload()).rejects.toThrowError('Validation is abstract class');
    await expect(validation.validateEditProfilePayload()).rejects.toThrowError('Validation is abstract class');
  });
});
