class GetDonation {
  constructor(payload) {
    const {
      id, fullname, email, donateAmount, status, proofAttachment,
    } = this.verifyPayload(payload);
    this.id = id;
    this.fullname = fullname;
    this.emai = email;
    this.donateAmount = donateAmount;
    this.status = status;
    this.proofAttachment = proofAttachment;
  }

  verifyPayload({
    id, fullname, email, donateAmount, status, proofAttachment,
  }) {
    if (!id || !fullname || !email || !donateAmount || !status || !proofAttachment) {
      throw new Error('Get_Donation.Not_Contain_Data_Spesification');
    }
    if (
      typeof (id) !== 'string'
      || typeof (fullname) !== 'string'
      || typeof (emai) !== 'string'
      || typeof (donateAmount) !== 'number'
      || typeof (status) !== 'string'
      || typeof (proofAttachment) !== 'string'
    ) {
      throw new Error('Get_Donation.Not_Meet_Data_Spesification');
    }
    return ({
      id, fullname, email, donateAmount, status, proofAttachment,
    });
  }
}
module.exports = GetDonation;
