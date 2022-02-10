const RegisterRepository = require('../RegisterRepository');

describe('RegisterRepository test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const registerRepository = new RegisterRepository();

    await expect(registerRepository.verifyAvailableEmail()).rejects.toThrowError('RegisterRepository is abstract class');
    await expect(registerRepository.addUser()).rejects.toThrowError('RegisterRepository is abstract class');
  });
});
