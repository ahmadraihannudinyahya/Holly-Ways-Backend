const NewFund = require('../../../Domains/Fund/Entities/NewFund');
const AddedFund = require('../../../Domains/Fund/Entities/AddedFund');

class AddFundUseCase {
  constructor({
    tokenManager, validation, storageService, fundRepository,
  }) {
    this.tokenManager = tokenManager;
    this.validation = validation;
    this.storageService = storageService;
    this.fundRepository = fundRepository;
  }

  async execute(payload) {
    const { userId: owner } = await this.tokenManager.verifyToken(payload.token);
    await this.validation.validateNewFundPayload(payload);
    const newFund = new NewFund({ ...payload, owner });
    newFund.setThumbnail = await this.storageService.uploadFile(payload.thumbnail);
    newFund.fundId = await this.fundRepository.addFund(newFund);
    return new AddedFund(newFund);
  }
}
module.exports = AddFundUseCase;
