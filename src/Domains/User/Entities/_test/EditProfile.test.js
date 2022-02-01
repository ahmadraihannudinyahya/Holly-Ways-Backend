const EditProfile = require('../EditProfile');

describe('EditProfile test', () => {
  it('should create object EditProfile corectly', () => {
    const payload = {
      fullname : 'test name', 
      phone : '0876543776',
      image : 'image.jpg', 
    };
    const editProfile = new EditProfile(payload);
    expect(editProfile.fullname).toEqual(payload.fullname);
    expect(editProfile.phone).toEqual(payload.phone);
    expect(editProfile.image).toEqual(payload.image);
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload1 = {
      fullname : {name : 'test name'}, 
    };
    const payload2 = {
      phone : ['0876543779'],
    };
    const payload3 = {
      image : {name : 'image.jpg'}, 
    };
    expect(() => new EditProfile(payload1)).toThrowError('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
    expect(() => new EditProfile(payload2)).toThrowError('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
    expect(() => new EditProfile(payload3)).toThrowError('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
  });
  it('should crete object EditProfile corectly when data not complete', () => {
    const payload1 = {
      fullname : 'test name', 
    };
    const payload2 = {
      phone : '0876543779',
    };
    const payload3 = {
      image : 'image.jpg', 
    };
    const editProfile1 = new EditProfile(payload1);
    const editProfile2 = new EditProfile(payload2);
    const editProfile3 = new EditProfile(payload3);

    expect(editProfile1.fullname).toEqual(payload1.fullname);
    expect(editProfile2.phone).toEqual(payload2.phone);
    expect(editProfile3.image).toEqual(payload3.image);
  });
  it('shoould not throw error when data not complete', () => {
    const payload1 = {
      fullname : 'test name', 
    };
    const payload2 = {
      phone : '0876543779',
    };
    const payload3 = {
      image : 'image.jpg', 
    };
    expect(() => new EditProfile(payload1)).not.toThrowError();
    expect(() => new EditProfile(payload2)).not.toThrowError();
    expect(() => new EditProfile(payload3)).not.toThrowError();
  });
});