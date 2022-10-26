const NewDonations = require('../../../Domains/Donations/Entities/NewDonations');

class AddDonationUsrCase {
  constructor({
    validation, tokenManager, storageService, userRepository, fundRepository, donationsRepository, notificationServices,
  }) {
    this.validation = validation;
    this.tokenManager = tokenManager;
    this.storageService = storageService;
    this.userRepository = userRepository;
    this.fundRepository = fundRepository;
    this.donationsRepository = donationsRepository;
    this.notificationServices = notificationServices;
  }

  async execute(payload) {
    this.validation.validateNewDonationPayload(payload);
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const newDonation = new NewDonations(payload);
    newDonation.setUserId = userId;
    await this.userRepository.verifyUserFound(newDonation.userId);
    await this.fundRepository.verifyFundFound(newDonation.fundId);
    await this.fundRepository.verifyFundStatusOpenById(newDonation.fundId);
    newDonation.setProofAttachment = await this.storageService.uploadFile(payload.proofAttachment);
    const { fullname } = await this.userRepository.getUserById(newDonation.userId);
    const { title } = await this.fundRepository.getFundById(newDonation.fundId);
    this.notificationServices.broadNotification(`${fullname} has been donate ${title} Rp.${newDonation.donateAmount}`);
    return this.donationsRepository.addDonations(newDonation);
  }
}
module.exports = AddDonationUsrCase;
