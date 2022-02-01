const EditProfile = require("../../../Domains/User/Entities/EditProfile");

class EditProfileUseCase{
  constructor({ validation, tokenManager, userRepository, storageServies }){
    this.validation = validation;
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
    this.storageServies = storageServies;
  }
  async execute(payload){
    this.validation.validateEditProfilePayload(payload);
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserFound(userId);
    if(payload.image){
      const imageName = await this.storageServies.uploadFile(payload.image);
      const editProfile = new EditProfile({...payload, image : imageName});
      return this.userRepository.editProfile(editProfile, userId);
    }
    const editProfile = new EditProfile(payload);
    return this.userRepository.editProfile(editProfile, userId);
  }
};
module.exports = EditProfileUseCase;