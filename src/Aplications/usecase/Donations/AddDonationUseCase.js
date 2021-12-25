const NewDonations = require('../../../Domains/Donations/Entities/NewDonations');

class AddDonationUsrCase {
  constructor({
    validation, tokenManager, storageService, userRepository, fundRepository, donationsRepository,
  }) {
    this.validation = validation;
    this.tokenManager = tokenManager;
    this.storageService = storageService;
    this.userRepository = userRepository;
    this.fundRepository = fundRepository;
    this.donationsRepository = donationsRepository;
  }

  async execute(payload) {
    this.validation.verifyNewDonationPayload(payload);
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const newDonation = new NewDonations(payload);
    newDonation.setUserId = userId;
    await this.userRepository.verifyUserFound(newDonation.userId);
    await this.fundRepository.verifyFundFound(newDonation.fundId);
    newDonation.setProofAttachment = await this.storageService.uploadFile(payload.ProofAttachment);
    return this.donationsRepository.addDonations(newDonation);
  }
}
module.exports = AddDonationUsrCase;