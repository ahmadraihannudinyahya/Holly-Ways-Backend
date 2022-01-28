const GetProfilUseCase = require('../GetProfilUseCase');

const TokenManager = require('../../../Security/TokenManager');
const UserRepository = require('../../../../Domains/User/UserRepository');

const GetUser = require('../../../../Domains/User/Entities/GetUser');

describe('test GetProfilUseCase', ()=>{
  it('should orchestrating GetProfilUseCase corectly', async ()=>{
    const payload = {
      token : 'faketoken.justfortest'
    };
    const user = {
      id : 'user-123',
      fullname : 'user test',
      email : 'test@mail.com'
    }
    const expectedProfil = new GetUser(user);

    const mockTokenManager = new TokenManager();
    const mockUserRepository = new UserRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(()=>Promise.resolve({userId : user.id}))
    mockUserRepository.verifyUserFound = jest.fn()
      .mockImplementation(()=>Promise.resolve());
    mockUserRepository.getUserById = jest.fn()
      .mockImplementation(()=>Promise.resolve(user));

    const getProfilUseCase = new GetProfilUseCase({
      tokenManager : mockTokenManager,
      userRepository : mockUserRepository,
    });

    const result = await getProfilUseCase.execute(payload);
    expect(result).toEqual(expectedProfil);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockUserRepository.verifyUserFound).toBeCalledWith(user.id);
    expect(mockUserRepository.getUserById).toBeCalledWith(user.id);
  });
});