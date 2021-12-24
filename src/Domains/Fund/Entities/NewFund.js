class NewFund {
  constructor(payload) {
    const {
      title, thumbnail, goal, description, owner,
    } = this.verifyPayload(payload);
    this.title = title;
    this.thumbnail = thumbnail;
    this.goal = goal;
    this.description = description;
    this.owner = owner;
  }

  verifyPayload({
    title, thumbnail, goal, description, owner,
  }) {
    intGoal = parseInt(goal);
    if (!title || !thumbnail || !description || !intGoal || !owner) {
      throw new Error('New_Fund.Not_Contain_Data_Spesification');
    }
    if (typeof (title) !== 'string' || typeof (thumbnail) !== 'string' || typeof (description) !== 'string' || typeof (owner) !== 'string' || typeof (intGoal) !== 'number') {
      throw new Error('New_Fund.Not_Meet_Data_Spesification');
    }
    return ({
      title, thumbnail, goal: intGoal, description, owner,
    });
  }

  set fundId(fundId) {
    this.id = fundId;
  }
}
module.exports = NewFund;
