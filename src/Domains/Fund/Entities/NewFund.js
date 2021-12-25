class NewFund {
  constructor(payload) {
    const {
      title, goal, description, owner,
    } = this.verifyPayload(payload);
    this.title = title;
    this.goal = goal;
    this.description = description;
    this.owner = owner;
  }

  verifyPayload({
    title, goal, description, owner,
  }) {
    const intGoal = parseInt(goal);
    if (!title || !description || !intGoal || !owner) {
      throw new Error('New_Fund.Not_Contain_Data_Spesification');
    }
    if (typeof (title) !== 'string' || typeof (description) !== 'string' || typeof (owner) !== 'string' || typeof (intGoal) !== 'number') {
      throw new Error('New_Fund.Not_Meet_Data_Spesification');
    }
    return ({
      title, goal: intGoal, description, owner,
    });
  }

  set fundId(fundId) {
    this.id = fundId;
  }

  set setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
}
module.exports = NewFund;
