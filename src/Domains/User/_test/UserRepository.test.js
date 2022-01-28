const UserRepository = require('../UserRepository');

describe('UserRepository test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const userRepository = new UserRepository();

    await expect(userRepository.getAllUsers).rejects.toThrowError('UserRepository is abstract class');
    await expect(userRepository.deleteUserById).rejects.toThrowError('UserRepository is abstract class');
    await expect(userRepository.verifyUserDeleteSelf).rejects.toThrowError('UserRepository is abstract class');
    await expect(userRepository.verifyUserRegisteredById).rejects.toThrowError('UserRepository is abstract class');
    await expect(userRepository.verifyUserFound).rejects.toThrowError('UserRepository is abstract class');
    await expect(userRepository.getUserById).rejects.toThrowError('UserRepository is abstract class');
  });
});