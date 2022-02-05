const GetProfile = require('../GetProfile');
describe('GetProfile test', () => {
  it('should create object GetProfile corectly', () => {
    const payload = {
      id : 'user-123',
      fullname : 'user test', 
      email : 'test@mail.com', 
    };
    const getProfile = new GetProfile(payload);
    expect(getProfile.id).toEqual(payload.id);
    expect(getProfile.fullname).toEqual(payload.fullname);
    expect(getProfile.email).toEqual(payload.email);
    expect(getProfile.phone).toEqual(null);
    expect(getProfile.image).toEqual(null);
  });
  it('should create object GetProfile corectly with phone and image', () => {
    const payload = {
      id : 'user-123',
      fullname : 'user test', 
      email : 'test@mail.com', 
      phone : '087658925',
      image : 'image.jpg', 
    };
    const getProfile = new GetProfile(payload);
    expect(getProfile.id).toEqual(payload.id);
    expect(getProfile.fullname).toEqual(payload.fullname);
    expect(getProfile.email).toEqual(payload.email);
    expect(getProfile.phone).toEqual(payload.phone);
    expect(getProfile.image).toBeDefined();
    expect(getProfile.image).not.toEqual(null);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      id : 'user-123',
      fullname : 'user test', 
      phone : '087658925',
      image : 'image.jpg', 
    };
    expect(() => new GetProfile(payload)).toThrowError('GET_PROFILE.NOT_CONTAIN_DATA_NEEDED');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload1 = {
      id : 89328948,
      fullname : 'user test', 
      email : 'test@mail.com', 
      phone : '087658925',
      image : 'image.jpg', 
    };
    const payload2 = {
      id : 'user-123',
      fullname : 'user test', 
      email : 'test@mail.com', 
      phone : 97498,
      image : 'image.jpg', 
    };
    const payload3 = {
      id : 'user-123',
      fullname : 'user test', 
      email : 'test@mail.com', 
      phone : '087658925',
      image : {name: 'image.jpg'}, 
    };
    expect(() => new GetProfile(payload1)).toThrowError('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
    expect(() => new GetProfile(payload2)).toThrowError('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
    expect(() => new GetProfile(payload3)).toThrowError('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
  });
});