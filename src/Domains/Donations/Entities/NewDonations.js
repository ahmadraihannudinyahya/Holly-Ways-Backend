class NewDonations {
  constructor(payload) {
    const { donateAmount, fundId } = this.verifyPayload(payload);
    this.donateAmount = donateAmount;
    this.fundId = fundId;
  }

  verifyPayload({ donateAmount, fundId }) {
    const intDonateAmount = parseInt(donateAmount);
    if (!intDonateAmount || !!fundId) {
      throw new Error('New_Donations.Not_Contain_Data_Spesification');
    }
    if (typeof (fundId) !== 'string') {
      throw new Error('New_Donations.Not_Meet_Data_Spesification');
    }
    return ({ fundId, donateAmount: intDonateAmount });
  }

  set setUserId(userId) {
    if (typeof (userId) !== 'string') {
      throw new Error('New_Donations.User_Id.Not_Meet_Data_Spesification');
    }
    this.userId = userId;
  }

  set setProofAttachment(proofAttachment) {
    if (typeof (userId) !== 'string') {
      throw new Error('New_Donations.Proof_Attachment.User_Id.Not_Meet_Data_Spesification');
    }
    this.proofAttachment = proofAttachment;
  }
}
module.exports = NewDonations;
