const GetDonation = require('../GetDonation');

describe('GetDonation test', () => {
  it('should create object GetDonation corectly', () => {
    const payload = {
      id : 'donation-123', 
      user : {
        fullname : 'user test', 
        email : 'test@mail.com', 
      }, 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : new Date(),
    };
    const getDonation = new GetDonation(payload);

    expect(getDonation.id).toEqual(payload.id);
    expect(getDonation.fullname).toEqual(payload.user.fullname);
    expect(getDonation.email).toEqual(payload.user.email);
    expect(getDonation.donateAmount).toEqual(payload.donateAmount);
    expect(getDonation.status).toEqual(payload.status);
    expect(getDonation.proofAttachment).not.toEqual(payload.proofAttachment);
    expect(getDonation.createdAt).not.toEqual(payload.createdAt);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      user : {
        fullname : 'user test', 
        email : 'test@mail.com', 
      }, 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : new Date(),
    };
    expect(() => new GetDonation(payload)).toThrowError('Get_Donation.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meed data spesification', () => {
    const payload = {
      id : 1232124, 
      user : {
        fullname : 'user test', 
        email : 'test@mail.com', 
      }, 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : new Date(),
    };
    expect(() => new GetDonation(payload)).toThrowError('Get_Donation.Not_Meet_Data_Spesification');
  });
});