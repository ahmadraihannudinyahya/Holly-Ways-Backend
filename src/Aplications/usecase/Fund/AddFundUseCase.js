const NewFund = require('../../../Domains/Fund/Entities/NewFund');
const AddedFund = require('../../../Domains/Fund/Entities/AddedFund');

class AddFundUseCase {
  constructor({
    tokenManager, validation, storageService, fundRepository, userRepository,
  }) {
    this.tokenManager = tokenManager;
    this.validation = validation;
    this.storageService = storageService;
    this.fundRepository = fundRepository;
    this.userRepository = userRepository;
  }

  async execute(payload) {
    const { userId: owner } = await this.tokenManager.verifyToken(payload.token);
    await this.validation.validateNewFundPayload(payload);
    await this.userRepository.verifyUserFound(owner);
    const newFund = new NewFund({ ...payload, owner });
    newFund.setThumbnail = await this.storageService.uploadFile(payload.thumbnail);
    newFund.fundId = await this.fundRepository.addFund(newFund);
    return new AddedFund(newFund);
  }
}
module.exports = AddFundUseCase;
