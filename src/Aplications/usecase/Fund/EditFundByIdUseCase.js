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
    const fund = await this.fundRepostory.getFundById(editFund.id);
    const donationObtained = await this.donationRepository.getDonationCountByFundId(editFund.id);
    return new GetFund({
      id : fund.id, 
      title : fund.title,
      thumbnail : fund.thumbnail, 
      goal : fund.goal, 
      description : fund.description, 
      donationObtained
    });
  }
}
module.exports = EditFundByIdUseCase;
