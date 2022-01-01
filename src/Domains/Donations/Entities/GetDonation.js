class GetDonation {
  constructor(payload) {
    const {
      id, fullname, email, donateAmount, status, proofAttachment, createdAt
    } = this.verifyPayload(payload);
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.donateAmount = donateAmount;
    this.status = status;
    this.proofAttachment = proofAttachment;
    this.postAt = this.convertDate(createdAt);
  }

  verifyPayload({
    id, user, donateAmount, status, proofAttachment, createdAt
  }) {
    const { fullname, email } = user;
    if (!id || !fullname || !email || !donateAmount || !status || !proofAttachment ||!createdAt) {
      throw new Error('Get_Donation.Not_Contain_Data_Spesification');
    }
    if (
      typeof (id) !== 'string'
      || typeof (fullname) !== 'string'
      || typeof (email) !== 'string'
      || typeof (donateAmount) !== 'number'
      || typeof (status) !== 'string'
      || typeof (proofAttachment) !== 'string'
      || typeof (createdAt) !== 'object'
    ) {
      throw new Error('Get_Donation.Not_Meet_Data_Spesification');
    }
    return ({
      id, fullname, email, donateAmount, status, proofAttachment, createdAt,
    });
  }
  convertDate(date){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  }
}
module.exports = GetDonation;
