/* istanbul ignore file */
const AddFundUseCase = require('../AddFundUseCase');

const TokenManager = require('../../../Security/TokenManager');
const Validation = require('../../../Validation/Validation');
const StorageServices = require('../../../Storage/StorageServices');
const FundRepository = require('../../../../Domains/Fund/FundRepository');
const UserRepository = require('../../../../Domains/User/UserRepository');

const NewFund = require('../../../../Domains/Fund/Entities/NewFund');
const AddedFund = require('../../../../Domains/Fund/Entities/AddedFund');

describe('test AddFundUseCase', () => {
  it('should orchestrating AddFundUseCase corectly', async () => {
    const payload = {
      title: 'test title',
      goal: 100_000_000,
      description: 'this is desc',
      token: 'faketoken.justfortest',
      thumbnail: 'image.jpg',
    };
    const expectedUser = 'user-123';
    const expectedUploadedFile = '1213325543.jpg';
    const expectedFundId = 'fund-123';
    const newFund = new NewFund({ ...payload, owner: expectedUser });
    newFund.fundId = expectedFundId;
    newFund.setThumbnail = expectedUploadedFile;
    const expectedAddedFund = new AddedFund(newFund);

    const mockTokenManager = new TokenManager();
    const mockValidation = new Validation();
    const mockStorageServices = new StorageServices();
    const mockfundRepository = new FundRepository();
    const mockUserRepository = new UserRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({ userId: expectedUser }));
    mockValidation.validateNewFundPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockStorageServices.uploadFile = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedUploadedFile));
    mockfundRepository.addFund = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedFundId));
    mockUserRepository.verifyUserFound = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const addFundUseCase = new AddFundUseCase({
      tokenManager: mockTokenManager,
      validation: mockValidation,
      storageService: mockStorageServices,
      fundRepository: mockfundRepository,
      userRepository: mockUserRepository,
    });

    const result = await addFundUseCase.execute(payload);

    expect(result).toEqual(expectedAddedFund);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockValidation.validateNewFundPayload).toBeCalledWith(payload);
    expect(mockStorageServices.uploadFile).toBeCalledWith(payload.thumbnail);
    expect(mockUserRepository.verifyUserFound).toBeCalledWith(expectedUser);
    expect(mockfundRepository.addFund).toBeCalledWith(newFund);
  });
});
