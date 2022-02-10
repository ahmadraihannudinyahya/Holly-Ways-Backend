const PasswordHash = require('../PasswordHash');

describe('PasswordHash test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const passwordHash = new PasswordHash();

    await expect(passwordHash.hashPassword()).rejects.toThrowError('PasswordHash is abstract class');
    await expect(passwordHash.comparePassword()).rejects.toThrowError('PasswordHash is abstract class');
  });
});
