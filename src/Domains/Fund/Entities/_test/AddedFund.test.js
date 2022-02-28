/* istanbul ignore file */
const AddedFund = require('../AddedFund');

describe('AddedFund test', () => {
  it('should create object AddedFund corectly', () => {
    const payload = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 25_000_000,
      description: 'fund description',
    };
    const addedFund = new AddedFund(payload);
    expect(addedFund.id).toEqual(payload.id);
    expect(addedFund.title).toEqual(payload.title);
    expect(addedFund.thumbnail).not.toEqual(payload.thumbnail);
    expect(addedFund.goal).toEqual(payload.goal);
    expect(addedFund.description).toEqual(payload.description);
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: 25_000_000,
    };
    expect(() => new AddedFund(payload)).toThrowError('Added_Fund.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      id: 'fund-123',
      title: 'fund title',
      thumbnail: 'image.jpg',
      goal: '25_000_000',
      description: 'fund description',
    };
    expect(() => new AddedFund(payload)).toThrowError('Added_Fund.Not_Meet_Data_Spesification');
  });
});
