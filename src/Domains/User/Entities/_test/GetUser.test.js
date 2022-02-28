/* istanbul ignore file */
const GetUser = require('../GetUser');

describe('GetUser test', () => {
  it('should return get user object corectly', () => {
    const payload = {
      id: 'user-123',
      fullname: 'user test',
      email: 'user@mail.com',
    };
    const getUser = new GetUser(payload);
    expect(getUser.id).toEqual(payload.id);
    expect(getUser.fullname).toEqual(payload.fullname);
    expect(getUser.email).toEqual(payload.email);
  });
  it('should throw error whhen not contain data needed', () => {
    const payload = {
      id: 'user-123',
      fullname: 'user test',
    };
    expect(() => new GetUser(payload)).toThrowError('Get_User.Not_Contain_Data_Spesification');
  });
  it('should throw error when not meet data spesification', () => {
    const payload = {
      id: 'user-123',
      fullname: 'user test',
      email: 12314,
    };
    expect(() => new GetUser(payload)).toThrowError('Get_User.Not_Meet_Data_Spesification');
  });
});
