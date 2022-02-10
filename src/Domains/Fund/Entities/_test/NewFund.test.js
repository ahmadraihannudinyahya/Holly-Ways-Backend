const NewFund = require('../NewFund');

describe('NewFund test', () => {
  it('should create object NewFund corectly', () => {
    const payload = {
      title: 'fund title',
      goal: '2000000',
      description: 'fund description',
      owner: 'user-123',
    };
    const newFund = new NewFund(payload);
    expect(newFund.title).toEqual(payload.title);
    expect(newFund.goal).not.toEqual(payload.goal);
    expect(newFund.description).toEqual(payload.description);
    expect(newFund.owner).toEqual(payload.owner);
    expect(typeof (newFund.goal)).toEqual('number');
  });
  it('should set fundid corectly', () => {
    const payload = {
      title: 'fund title',
      goal: '2000000',
      description: 'fund description',
      owner: 'user-123',
    };
    const newFund = new NewFund(payload);
    newFund.fundId = 'fund-123';
    expect(newFund.title).toEqual(payload.title);
    expect(newFund.goal).not.toEqual(payload.goal);
    expect(newFund.description).toEqual(payload.description);
    expect(newFund.owner).toEqual(payload.owner);
    expect(typeof (newFund.goal)).toEqual('number');
    expect(newFund.id).toEqual('fund-123');
  });
  it('should set thumbnail corectly', () => {
    const payload = {
      title: 'fund title',
      goal: '2000000',
      description: 'fund description',
      owner: 'user-123',
    };
    const newFund = new NewFund(payload);
    newFund.setThumbnail = 'image.jpg';
    expect(newFund.title).toEqual(payload.title);
    expect(newFund.goal).not.toEqual(payload.goal);
    expect(newFund.description).toEqual(payload.description);
    expect(newFund.owner).toEqual(payload.owner);
    expect(typeof (newFund.goal)).toEqual('number');
    expect(newFund.thumbnail).toEqual('image.jpg');
  });
  it('should throw error when payload not contain data needed', () => {
    const payload = {
      title: 'fund title',
      goal: '2000000',
      description: 'fund description',
    };
    expect(() => new NewFund(payload)).toThrowError('New_Fund.Not_Contain_Data_Spesification');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload = {
      title: 'fund title',
      goal: '2000000',
      description: 'fund description',
      owner: { id: 'user-123' },
    };
    expect(() => new NewFund(payload)).toThrowError('New_Fund.Not_Meet_Data_Spesification');
  });
});
