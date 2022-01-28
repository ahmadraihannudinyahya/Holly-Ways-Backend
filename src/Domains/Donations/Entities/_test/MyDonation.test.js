const MyDonation = require('../MyDonation');

describe('MyDonation test', () => {
  it('should create object MyDonation corectly', () => {
    const payload = {
      id : 'donation-123', 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : new Date(), 
      fundTitle : 'title fund'
    };
    const myDonation = new MyDonation(payload);
    expect(myDonation.id).toEqual(payload.id);
    expect(myDonation.donateAmount).toEqual(payload.donateAmount);
    expect(myDonation.status).toEqual(payload.status);
    expect(myDonation.proofAttachment).not.toEqual(payload.proofAttachment);
    expect(myDonation.createdAt).not.toEqual(payload.createdAt);
    expect(myDonation.fundTitle).toEqual(payload.fundTitle);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      id : 'donation-123', 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : new Date(), 
    };
    expect(() => new MyDonation(payload)).toThrowError('My_Donation.Not_Contain_Data_Spesification')
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      id : 'donation-123', 
      donateAmount : 20_000, 
      status : 'pending', 
      proofAttachment : 'image.jpg', 
      createdAt : 'date', 
      fundTitle : 'title fund'
    };
    expect(() => new MyDonation(payload)).toThrowError('My_Donation.Not_Meet_Data_Spesification')
  });
});