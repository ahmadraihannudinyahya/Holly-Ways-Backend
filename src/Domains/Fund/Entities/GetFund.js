class GetFund {
  constructor(payload) {
    const {
      id, title, thumbnail, goal, description,
    } = this.verifyPayload(payload);
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.goal = goal;
    this.description = description;
  }

  verifyPayload({
    id, title, thumbnail, goal, description,
  }) {
    if (!id || !title || !thumbnail || !goal || !description) {
      throw new Error('Added_Fund.Not_Contain_Data_Spesification');
    }
    if (typeof (id) !== 'string' || typeof (title) !== 'string' || typeof (thumbnail) !== 'string' || typeof (description) !== 'string' || typeof (goal) !== 'number') {
      throw new Error('Added_Fund.Not_Meet_Data_Spesification');
    }
    return ({
      id, title, thumbnail, goal, description,
    });
  }
}
module.exports = GetFund;
