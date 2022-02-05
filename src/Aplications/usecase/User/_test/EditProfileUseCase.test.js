const EditProfileUseCase = require('../EditProfileUseCase');
const Validation = require('../../../Validation/Validation');
const TokenManager = require('../../../Security/TokenManager');
const UserRepository = require('../../../../Domains/User/UserRepository');
const StorageServices = require('../../../Storage/StorageServices');
const EditProfile = require('../../../../Domains/User/Entities/EditProfile');
describe('EditProfileUseCase test', () => {
  it('should orchestrating EditProfileUseCase corectly with image', async () => {
    const payload = {
      fullname : 'user test',
      image : {
        originalName : 'image.jpg',
        mimeType : 'iamge/jpeg',
      }, 
      token : 'FakeToken.JustForTest', 
    };
    const expectedUserId = 'user-123';
    const expectedImageName = 'image8523.jpg';
    const editProfile = new EditProfile({fullname : payload.fullname, image : expectedImageName});

    const mockValidation = new Validation();
    const mockTokenManager = new TokenManager();
    const mockUserRepository = new UserRepository();
    const mockStorageServices = new StorageServices();

    mockValidation.validateEditProfilePayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({userId : expectedUserId}));
    mockUserRepository.verifyUserFound = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockStorageServices.uploadFile = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedImageName));
    mockUserRepository.editProfile = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const editProfileUseCase = new EditProfileUseCase({
      validation : mockValidation, 
      tokenManager : mockTokenManager, 
      userRepository : mockUserRepository, 
      storageServies : mockStorageServices, 
    });
    await editProfileUseCase.execute(payload);

    expect(mockValidation.validateEditProfilePayload).toBeCalledWith(payload);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockUserRepository.verifyUserFound).toBeCalledWith(expectedUserId);
    expect(mockStorageServices.uploadFile).toBeCalledWith(payload.image);
    expect(mockUserRepository.editProfile).toBeCalledWith(editProfile, expectedUserId);
  });
  it('should orchestrating EditProfileUseCase corectly without image', async () => {
    const payload = {
      phone : '0898765689',
      token : 'FakeToken.JustForTest', 
    };
    const expectedUserId = 'user-123';
    const editProfile = new EditProfile({phone : payload.phone});

    const mockValidation = new Validation();
    const mockTokenManager = new TokenManager();
    const mockUserRepository = new UserRepository();
    const mockStorageServices = new StorageServices();

    mockValidation.validateEditProfilePayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({userId : expectedUserId}));
    mockUserRepository.verifyUserFound = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockStorageServices.uploadFile = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.editProfile = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const editProfileUseCase = new EditProfileUseCase({
      validation : mockValidation, 
      tokenManager : mockTokenManager, 
      userRepository : mockUserRepository, 
      storageServies : mockStorageServices, 
    });
    await editProfileUseCase.execute(payload);

    expect(mockValidation.validateEditProfilePayload).toBeCalledWith(payload);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockUserRepository.verifyUserFound).toBeCalledWith(expectedUserId);
    expect(mockStorageServices.uploadFile).not.toBeCalledWith();
    expect(mockUserRepository.editProfile).toBeCalledWith(editProfile, expectedUserId);
  });
});