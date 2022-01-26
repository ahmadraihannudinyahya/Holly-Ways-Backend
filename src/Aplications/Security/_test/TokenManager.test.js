const TokenManager = require('../TokenManager');

describe('TokenManager test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const tokenManager = new TokenManager();

    await expect(tokenManager.createToken()).rejects.toThrowError('TokenManager is abstract class');
    await expect(tokenManager.verifyToken()).rejects.toThrowError('TokenManager is abstract class');
  });
});