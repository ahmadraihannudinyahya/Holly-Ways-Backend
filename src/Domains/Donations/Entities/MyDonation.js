class MyDonation {
  constructor(payload) {
    const {
      id, donateAmount, status, proofAttachment, createdAt, fundTitle,
    } = this.verifyPayload(payload);
    this.id = id;
    this.donateAmount = donateAmount;
    this.status = status;
    this.proofAttachment = `${process.env.HOST}${process.env.ENDPOINT_FILE}/${proofAttachment}`;
    this.createdAt = this.convertDate(createdAt);
    this.fundTitle = fundTitle;
  }

  verifyPayload({
    id, donateAmount, status, proofAttachment, createdAt, fundTitle,
  }) {
    if (!id || !donateAmount || !status || !proofAttachment || !createdAt || !fundTitle) {
      throw new Error('My_Donation.Not_Contain_Data_Spesification');
    }
    if (
      typeof (id) !== 'string'
      || typeof (donateAmount) !== 'number'
      || typeof (status) !== 'string'
      || typeof (proofAttachment) !== 'string'
      || typeof (createdAt) !== 'object'
      || typeof (fundTitle) !== 'string'
    ) {
      throw new Error('My_Donation.Not_Meet_Data_Spesification');
    }
    return ({
      id, donateAmount, status, proofAttachment, createdAt, fundTitle,
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
module.exports = MyDonation;
