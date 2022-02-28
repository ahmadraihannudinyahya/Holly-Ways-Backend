/* istanbul ignore file */
const EditFund = require('../../../../Domains/Fund/Entities/EditFund');
const EditFundByIdUseCase = require('../EditFundByIdUseCase');

const TokenManager = require('../../../Security/TokenManager');
const Validation = require('../../../Validation/Validation');
const StorageServices = require('../../../Storage/StorageServices');
const FundRepository = require('../../../../Domains/Fund/FundRepository');
const DonationRepository = require('../../../../Domains/Donations/DonationRepository');

describe('EditFundByIdUseCase test', () => {
  it('should orchestarating EditFundByIdUseCase corectly with thumbnail', async () => {
    const payload = {
      token: 'fakeToken.justForTest',
      title: 'test title',
      description: 'description test',
      id: 'fund-fakeid',
      goal: '2000000',
      thumbnail: 'fake images',
    };
    const editFund = new EditFund(payload);
    const expectedThumnail = payload.thumbnail;
    const expectedUserId = 'user-fakeid';
    const expectedSavedThumbnail = 'savedthumbnail';
    editFund.setThumbnail = expectedThumnail;
    const expectedGetFund = {
      id: payload.id,
      title: payload.title,
      thumbnail: payload.thumbnail,
      goal: 20000000,
      description: payload.description,
      createdAt: new Date(),
      status: 'open',
      donations: [
        {
          status: 'success',
          donateAmount: 25000,
        },
        {
          status: 'pending',
          donateAmount: 50000,
        },
        {
          status: 'success',
          donateAmount: 50000,
        },
      ],
    };
    const mockTokenManager = new TokenManager();
    const mockValidation = new Validation();
    const mockStorageServices = new StorageServices();
    const mockFundRepository = new FundRepository();
    const mockDonationRepository = new DonationRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({ userId: expectedUserId }));
    mockValidation.validateEditFundPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockFundRepository.verifyFundFound = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockFundRepository.verifyFundOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockFundRepository.getFundById = jest.fn()
      .mockImplementation(() => Promise.resolve({ thumbnail: expectedSavedThumbnail }));
    mockStorageServices.deleteFile = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockStorageServices.uploadFile = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThumnail));
    mockFundRepository.editFundById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockFundRepository.getFundsByIdWithDonations = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedGetFund));

    const editFundByIdUseCase = new EditFundByIdUseCase({
      tokenManager: mockTokenManager,
      fundRepostory: mockFundRepository,
      validation: mockValidation,
      storageService: mockStorageServices,
      donationRepository: mockDonationRepository,
    });
    const result = await editFundByIdUseCase.execute(payload);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockValidation.validateEditFundPayload).toBeCalledWith(payload);
    expect(mockFundRepository.verifyFundFound).toBeCalledWith(editFund.id);
    expect(mockFundRepository.verifyFundOwner).toBeCalledWith(editFund.id, expectedUserId);
    expect(mockFundRepository.getFundById).toBeCalledWith(editFund.id);
    expect(mockStorageServices.deleteFile).toBeCalledWith(expectedSavedThumbnail);
    expect(mockStorageServices.uploadFile).toBeCalledWith(payload.thumbnail);
    expect(mockFundRepository.editFundById).toBeCalledWith(editFund);
    expect(mockFundRepository.getFundsByIdWithDonations).toBeCalledWith(editFund.id);
  });
});
