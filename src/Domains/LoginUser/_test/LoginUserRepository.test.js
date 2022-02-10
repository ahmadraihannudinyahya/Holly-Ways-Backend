const LoginUserRepository = require('../LoginUserRepository');

describe('LoginUserRepository test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const loginUserRepository = new LoginUserRepository();

    await expect(loginUserRepository.verifyUserByEmail).rejects.toThrowError('LoginUserRepository is abstract class');
    await expect(loginUserRepository.getUserByEmail).rejects.toThrowError('LoginUserRepository is abstract class');
  });
});
