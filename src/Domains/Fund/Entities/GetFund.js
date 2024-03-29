class GetFund {
  constructor(payload) {
    const {
      id, title, thumbnail, goal, description, donationObtained, createdAt, donationCount, status,
    } = this.verifyPayload(payload);
    this.id = id;
    this.title = title;
    this.thumbnail = `${process.env.HOST}${process.env.ENDPOINT_FILE}/${thumbnail}`;
    this.goal = goal;
    this.description = description;
    this.donationObtained = donationObtained;
    this.donationCount = donationCount;
    this.status = status;
    this.postAt = this.convertDate(createdAt);
  }

  verifyPayload({
    id, title, thumbnail, goal, description, donationObtained, createdAt, donationCount, status,
  }) {
    if (!id || !title || !thumbnail || !goal || !description || !createdAt || !status || !donationObtained && donationObtained !== 0 || !donationCount && donationCount !== 0) {
      throw new Error('Get_Fund.Not_Contain_Data_Spesification');
    }
    if (typeof (id) !== 'string' || typeof (title) !== 'string' || typeof (thumbnail) !== 'string' || typeof (description) !== 'string' || typeof (goal) !== 'number' || typeof (createdAt) !== 'object' || typeof (status) !== 'string') {
      throw new Error('Get_Fund.Not_Meet_Data_Spesification');
    }
    if (typeof (donationObtained) !== 'number' && typeof (donationObtained) !== 'boolean') {
      throw new Error('Get_Fund.Not_Meet_Data_Spesification');
    }
    if (typeof (donationCount) !== 'number' && typeof (donationCount) !== 'boolean') {
      throw new Error('Get_Fund.Not_Meet_Data_Spesification');
    }
    return ({
      id, title, thumbnail, goal, description, donationObtained, createdAt, donationCount, status,
    });
  }

  convertDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  }
}
module.exports = GetFund;
