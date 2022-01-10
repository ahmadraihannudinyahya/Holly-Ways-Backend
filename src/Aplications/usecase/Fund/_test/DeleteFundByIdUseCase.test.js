const DeleteFundByIdUseCase = require('../DeleteFundByIdUseCase');
const Fundrepository = require('../../../../Domains/Fund/FundRepository');
const StorageServices = require('../../../Storage/StorageServices');
const TokenManager = require('../../../Security/TokenManager');

describe('test DeleteFundByIdUseCase', ()=>{
  it('should orchestrating DeleteFundByIdUseCase corectly', async ()=>{
    const payload = {
      token : 'faketoken.justfortest', 
      fundId : 'fund-123', 
    };
    const expectedUser = 'user-123';
    const mockFundrepository = new Fundrepository();
    const mockStorageServices = new StorageServices();
    const mockTokenManager = new TokenManager();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(()=>Promise.resolve({userId : expectedUser}));
    mockFundrepository.verifyFundFound = jest.fn()
      .mockImplementation(()=>Promise.resolve());
    mockFundrepository.verifyFundOwner = jest.fn()
      .mockImplementation(()=>Promise.resolve());
    mockFundrepository.deleteFundById = jest.fn()
      .mockImplementation(()=>Promise.resolve());
    mockStorageServices.deleteFile = jest.fn()
      .mockImplementation(()=>Promise.resolve());

    const deleteFundByIdUseCase = new DeleteFundByIdUseCase({
      fundRepository : mockFundrepository, 
      tokenManager : mockTokenManager, 
      storageService : mockStorageServices, 
    });
    await deleteFundByIdUseCase.execute(payload);

    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockFundrepository.verifyFundFound).toBeCalledWith(payload.fundId);
    expect(mockFundrepository.verifyFundFound).toBeCalledWith(payload.fundId);
    expect(mockFundrepository.deleteFundById).toBeCalledWith(payload.fundId);
    expect(mockStorageServices.deleteFile).not.toBeCalled();
  });
});