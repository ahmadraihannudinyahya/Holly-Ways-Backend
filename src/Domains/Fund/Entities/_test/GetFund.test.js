/* istanbul ignore file */
const GetFund = require('../GetFund');

describe('GetFund test', () => {
  it('should create object GetFund corectly', () => {
    const payload = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 20_000_000,
      description: 'fund description',
      donationObtained: 0,
      createdAt: new Date(),
      donationCount: 0,
      status: 'open',
    };
    const getFund = new GetFund(payload);
    expect(getFund.id).toEqual(payload.id);
    expect(getFund.title).toEqual(payload.title);
    expect(getFund.thumbnail).not.toEqual(payload.thumbnail);
    expect(getFund.goal).toEqual(payload.goal);
    expect(getFund.description).toEqual(payload.description);
    expect(getFund.donationObtained).toEqual(payload.donationObtained);
    expect(getFund.createdAt).not.toEqual(payload.createdAt);
    expect(getFund.donationCount).toEqual(payload.donationCount);
    expect(getFund.status).toEqual(payload.status);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 20_000_000,
      description: 'fund description',
      donationObtained: 20_000,
      createdAt: new Date(),
      donationCount: 1,
      status: 'open',
    };
    expect(() => new GetFund(payload)).toThrowError('Get_Fund.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload1 = {
      id: 'fund-123',
      title: { name: 'fund title' },
      thumbnail: 'image.jpg',
      goal: 20_000_000,
      description: 'fund description',
      donationObtained: 20_000,
      createdAt: new Date(),
      donationCount: 1,
      status: 'open',
    };
    const payload2 = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 20_000_000,
      description: 'fund description',
      donationObtained: '20000',
      createdAt: new Date(),
      donationCount: 1,
      status: 'open',
    };
    const payload3 = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 20_000_000,
      description: 'fund description',
      donationObtained: 20_000,
      createdAt: new Date(),
      donationCount: '1',
      status: 'open',
    };
    expect(() => new GetFund(payload1)).toThrowError('Get_Fund.Not_Meet_Data_Spesification');
    expect(() => new GetFund(payload2)).toThrowError('Get_Fund.Not_Meet_Data_Spesification');
    expect(() => new GetFund(payload3)).toThrowError('Get_Fund.Not_Meet_Data_Spesification');
  });
});
