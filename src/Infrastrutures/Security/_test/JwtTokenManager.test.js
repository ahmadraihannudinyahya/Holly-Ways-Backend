const jwt = require('jsonwebtoken');
const AuthorizationError = require('../../../Commons/Exceptions/AuthorizationError');
const JwtTokenManager = require('../JwtTokenManager');

describe('test JwtTokenManager', () => {
  describe('method createToken', () => {
    it('should return token corectly', async () => {
      const userId = 'user-123';
      const jwtTokenManager = new JwtTokenManager(jwt);
      const token = await jwtTokenManager.createToken({ userId });
      expect(token).toBeDefined();
    });
  });
  describe('method verifyToken', () => {
    it('should not throw error when token id valid', async () => {
      const userId = 'user-123';
      const jwtTokenManager = new JwtTokenManager(jwt);
      const token = await jwtTokenManager.createToken({ userId });
      await expect(jwtTokenManager.verifyToken(token)).resolves.not.toThrowError();
    });
    it('should return object with userId corectly', async () => {
      const userId = 'user-123';
      const jwtTokenManager = new JwtTokenManager(jwt);
      const token = await jwtTokenManager.createToken({ userId });
      const verifedToken = await jwtTokenManager.verifyToken(token);
      expect(verifedToken.userId).toBeDefined();
      expect(verifedToken.userId).toEqual(userId);
    });
    it('should throw AuthorizationError when token not valid', async () => {
      const jwtTokenManager = new JwtTokenManager(jwt);
      await expect(jwtTokenManager.verifyToken('invalidtoken')).rejects.toThrowError(AuthorizationError);
    });
  });
});
