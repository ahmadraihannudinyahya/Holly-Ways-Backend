const EditFund = require('../../../Domains/Fund/Entities/EditFund');
const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class EditFundByIdUseCase {
  constructor({
    tokenManager, fundRepostory, validation, storageService,
  }) {
    this.tokenManager = tokenManager;
    this.fundRepostory = fundRepostory;
    this.validation = validation;
    this.storageService = storageService;
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
    const fund = await this.fundRepostory.editFundById(editFund);
    return new GetFund(fund);
  }
}
module.exports = EditFundByIdUseCase;
