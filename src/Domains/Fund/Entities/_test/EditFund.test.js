const EditFund = require('../EditFund');

describe('EditFund test', () => {
  it('should create object EditFund corectly', () => {
    const payload = {
      title: 'fund title',
      goal: '200000000',
      description: 'fund description',
      id: 'fund-123',
    };
    const editFund = new EditFund(payload);
    expect(editFund.title).toEqual(payload.title);
    expect(editFund.goal).toEqual(payload.goal);
    expect(editFund.description).toEqual(payload.description);
    expect(editFund.id).toEqual(payload.id);
  });
  it('should set thumnail corectly', () => {
    const payload = {
      title: 'fund title',
      goal: '200000000',
      description: 'fund description',
      id: 'fund-123',
    };
    const editFund = new EditFund(payload);
    editFund.setThumbnail = 'image.jpg';
    expect(editFund.title).toEqual(payload.title);
    expect(editFund.goal).toEqual(payload.goal);
    expect(editFund.description).toEqual(payload.description);
    expect(editFund.id).toEqual(payload.id);
    expect(editFund.thumbnail).toEqual('image.jpg');
  });
  it('should not throw error when payload just contain id', () => {
    const payload = {
      id: 'fund-123',
    };
    expect(() => new EditFund(payload)).not.toThrowError();
  });
  it('should throw error when payoad not contain id', () => {
    const payload = {
      title: 'fund title',
      goal: '200000000',
      description: 'fund description',
    };
    expect(() => new EditFund(payload)).toThrowError('Edit_Fund.Must_Have_IdFund');
  });
  it('should throw error when payload not meet data spesification', () => {
    const payload1 = {
      title: { name: 'fund title' },
      id: 'fund-123',
    };
    const payload2 = {
      goal: 200000000,
      id: 'fund-123',
    };
    const payload3 = {
      description: [],
      id: 'fund-123',
    };
    expect(() => new EditFund(payload1)).toThrowError('Edit_Fund.Not_Meet_Data_Spesification');
    expect(() => new EditFund(payload2)).toThrowError('Edit_Fund.Not_Meet_Data_Spesification');
    expect(() => new EditFund(payload3)).toThrowError('Edit_Fund.Not_Meet_Data_Spesification');
  });
});
