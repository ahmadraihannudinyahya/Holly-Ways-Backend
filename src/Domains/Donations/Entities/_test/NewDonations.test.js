/* istanbul ignore file */
const NewDonations = require('../NewDonations');

describe('NewDonations test', () => {
  it('should create object NewDonations corectly', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 'fund-123',
    };
    const newDonation = new NewDonations(payload);
    expect(newDonation.fundId).toEqual(payload.fundId);
    expect(newDonation.donateAmount).not.toEqual(payload.donateAmount);
    expect(typeof (newDonation.donateAmount)).toEqual('number');
  });
  it('should set userId corectly', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 'fund-123',
    };
    const newDonation = new NewDonations(payload);
    newDonation.setUserId = 'user-123';
    expect(newDonation.fundId).toEqual(payload.fundId);
    expect(newDonation.donateAmount).not.toEqual(payload.donateAmount);
    expect(typeof (newDonation.donateAmount)).toEqual('number');
    expect(newDonation.userId).toEqual('user-123');
  });
  it('should throw error when set userId with not valid userId', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 'fund-123',
    };
    const newDonation = new NewDonations(payload);
    expect(() => newDonation.setUserId = 3468597).toThrowError('New_Donations.User_Id.Not_Meet_Data_Spesification');
  });
  it('should set proofAttachmen corectly', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 'fund-123',
    };
    const newDonation = new NewDonations(payload);
    newDonation.setProofAttachment = 'image.jpg';
    expect(newDonation.fundId).toEqual(payload.fundId);
    expect(newDonation.donateAmount).not.toEqual(payload.donateAmount);
    expect(typeof (newDonation.donateAmount)).toEqual('number');
    expect(newDonation.proofAttachment).toEqual('image.jpg');
  });
  it('should throw error when set proofAttachment with not valid proofAttachment', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 'fund-123',
    };
    const newDonation = new NewDonations(payload);
    expect(() => newDonation.setProofAttachment = { name: 'image.jpg' }).toThrowError('New_Donations.Proof_Attachment.User_Id.Not_Meet_Data_Spesification');
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      fundId: 'fund-123',
    };
    expect(() => new NewDonations(payload)).toThrowError('New_Donations.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      donateAmount: '20000',
      fundId: 35634565356,
    };
    expect(() => new NewDonations(payload)).toThrowError('New_Donations.Not_Meet_Data_Spesification');
  });
});
