class EditFund {
  constructor(payload) {
    const {
      title, goal, description, id,
    } = this.verifyPayload(payload);
  }

  verifyPayload({
    title = '', goal = '', description = '', id,
  }) {
    if (!id) {
      throw new Error('Edit_Fund.Must_Have_IdFund');
    }
    if (title) {
      if (typeof (title) !== 'string') {
        throw new Error('Edit_Fund.Not_Meet_Data_Spesification');
      }
    }
    if (goal) {
      if (typeof (goal) !== 'string') {
        throw new Error('Edit_Fund.Not_Meet_Data_Spesification');
      }
    } if (description) {
      if (typeof (description) !== 'string') {
        throw new Error('Edit_Fund.Not_Meet_Data_Spesification');
      }
    }
  }

  set setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
}
module.exports = EditFund;
