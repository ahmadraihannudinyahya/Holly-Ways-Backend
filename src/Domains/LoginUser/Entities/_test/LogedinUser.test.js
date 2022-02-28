/* istanbul ignore file */
const LogedinUser = require('../LogedinUser');

describe('LogedinUser test', () => {
  it('should create object LogedinUser corectly', () => {
    const payload = {
      fullname: 'test user',
      email: 'test@mail.com',
      token: 'fakeToken.JustForTest',
    };
    const logedinUser = new LogedinUser(payload);
    expect(logedinUser.fullname).toEqual(payload.fullname);
    expect(logedinUser.email).toEqual(payload.email);
    expect(logedinUser.token).toEqual(payload.token);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      fullname: 'test user',
      email: 'test@mail.com',
    };
    expect(() => new LogedinUser(payload)).toThrowError('Logedin_User.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      fullname: 'test user',
      email: 'test@mail.com',
      token: 4565434,
    };
    expect(() => new LogedinUser(payload)).toThrowError('Logedin_User.Not_Meet_Data_Spesification');
  });
});
