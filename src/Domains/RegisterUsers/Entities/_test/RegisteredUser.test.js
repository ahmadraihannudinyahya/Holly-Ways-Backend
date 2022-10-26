/* istanbul ignore file */
const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser test', () => {
  it('should create RegisteredUser object corectly', () => {
    const payload = {
      fullname: 'user test',
      token: 'fakeToken.JustForTest',
    };
    const registeredUser = new RegisteredUser(payload);
    expect(registeredUser.fullname).toEqual(payload.fullname);
    expect(registeredUser.token).toEqual(payload.token);
  });
  it('should throw error when not contain data needed', () => {
    const payload = {
      fullname: 'user test',
    };
    expect(() => new RegisteredUser(payload)).toThrowError('Registered_User.Not_Contain_Data_Spesification');
  });
  it('should throw error when not meet data spesification', () => {
    const payload = {
      fullname: 'test user',
      token: 90237498729,
    };
    expect(() => new RegisteredUser(payload)).toThrowError('Register_User.Not_Meet_Data_Spesification');
  });
});
