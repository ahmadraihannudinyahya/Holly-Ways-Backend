const RegisterUser = require('../RegisterUser');

describe('RegisterUser test', () => {
  it('should create object RegisterUser corectly', () => {
    const payload = {
      email : 'test@mail.com',
      password : 'testpassword', 
      fullname : 'user test',
    };
    const registerUser = new RegisterUser(payload);
    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.password).toEqual(payload.password);
    expect(registerUser.fullname).toEqual(payload.fullname);
  });
  it('should set id corectly', () => {
    const payload = {
      email : 'test@mail.com',
      password : 'testpassword', 
      fullname : 'user test',
    };
    const registerUser = new RegisterUser(payload);

    registerUser.id = 'user-123';

    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.password).toEqual(payload.password);
    expect(registerUser.fullname).toEqual(payload.fullname);
    expect(registerUser.userId).toEqual('user-123');
  });
  it('should change password with hashed password corectly', () => {
    const payload = {
      email : 'test@mail.com',
      password : 'testpassword', 
      fullname : 'user test',
    };
    const registerUser = new RegisterUser(payload);
    registerUser.hashedPassword = 'encriptedPassword';
    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.password).not.toEqual(payload.password);
    expect(registerUser.password).toEqual('encriptedPassword');
    expect(registerUser.fullname).toEqual(payload.fullname);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      email : 'test@mail.com',
      password : 'testpassword', 
    };
    expect(() => new RegisterUser(payload)).toThrowError('Register_User.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet spesification', () => {
    const payload = {
      email : 'test@mail.com',
      password : 39845943, 
      fullname : 'user test',
    };
    expect(() => new RegisterUser(payload)).toThrowError('Register_User.Not_Meet_Data_Spesification');
  });
});