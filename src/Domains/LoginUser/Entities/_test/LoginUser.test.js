const LoginUser = require('../LoginUser');

describe('LoginUser test', () => {
  it('should create object LoginUser corectly', () => {
    const payload = {
      email: 'user@mail.com',
      password: 'passwordtest',
    };
    const loginUser = new LoginUser(payload);
    expect(loginUser.email).toEqual(payload.email);
    expect(loginUser.password).toEqual(payload.password);
  });
  it('should set id corectly', () => {
    const payload = {
      email: 'user@mail.com',
      password: 'passwordtest',
    };
    const loginUser = new LoginUser(payload);
    loginUser.id = 'user-123';
    expect(loginUser.userId).toEqual('user-123');
    expect(loginUser.email).toEqual(payload.email);
    expect(loginUser.password).toEqual(payload.password);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      email: 'user@mail.com',
    };
    expect(() => new LoginUser(payload)).toThrowError('Login_User.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      email: 'user@mail.com',
      password: 45643436,
    };
    expect(() => new LoginUser(payload)).toThrowError('Login_User.Not_Meet_Data_Spesification');
  });
});
