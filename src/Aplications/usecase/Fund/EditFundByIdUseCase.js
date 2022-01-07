const EditFund = require('../../../Domains/Fund/Entities/EditFund');
const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class EditFundByIdUseCase {
  constructor({
    tokenManager, fundRepostory, validation, storageService, donationRepository
  }) {
    this.tokenManager = tokenManager;
    this.fundRepostory = fundRepostory;
    this.validation = validation;
    this.storageService = storageService;
    this.donationRepository = donationRepository;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.validation.validateEditFundPayload(payload);
    const editFund = new EditFund(payload);
    await this.fundRepostory.verifyFundFound(editFund.id);
    await this.fundRepostory.verifyFundOwner(editFund.id, userId);
    if (payload.thumbnail) {
      const { thumbnail: deleteThumnail } = await this.fundRepostory.getFundById(editFund.id);
      await this.storageService.deleteFile(deleteThumnail);
      editFund.setThumbnail = await this.storageService.uploadFile(payload.thumbnail);
    }
    await this.fundRepostory.editFundById(editFund);
    const fund = await this.fundRepostory.getFundsByIdWithDonations(editFund.id);
    return new GetFund({
      id : fund.id, 
      title : fund.title,
      thumbnail : fund.thumbnail, 
      goal : fund.goal, 
      description : fund.description, 
      createdAt : fund.createdAt, 
      status : fund.status,
      donationObtained : fund.donations.reduce((total, donation) => {
        if(donation.status === 'success'){
          return total + donation.donateAmount;
        };
        return total;
      }, 0),
      donationCount : fund.donations.reduce((total, donation)=>{
        if(donation.status === 'success'){
          return total++;
        };
        return total;
      }, 0),
    });
  }
}
module.exports = EditFundByIdUseCase;
