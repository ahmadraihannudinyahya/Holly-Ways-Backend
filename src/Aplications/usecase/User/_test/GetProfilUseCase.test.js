const GetProfilUseCase = require('../GetProfilUseCase');

const TokenManager = require('../../../Security/TokenManager');
const UserRepository = require('../../../../Domains/User/UserRepository');

const GetProfile = require('../../../../Domains/User/Entities/GetProfile');

describe('test GetProfilUseCase', ()=>{
  it('should orchestrating GetProfilUseCase corectly', async ()=>{
    const payload = {
      token : 'faketoken.justfortest'
    };
    const user = {
      id : 'user-123',
      fullname : 'user test',
      email : 'test@mail.com', 
      phone : '087653787', 
      image : 'image.jpeg',
    }
    const expectedProfil = new GetProfile(user);

    const mockTokenManager = new TokenManager();
    const mockUserRepository = new UserRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(()=>Promise.resolve({userId : user.id}))
    mockUserRepository.verifyUserFound = jest.fn()
      .mockImplementation(()=>Promise.resolve());
    mockUserRepository.getProfile = jest.fn()
      .mockImplementation(()=>Promise.resolve(user));

    const getProfilUseCase = new GetProfilUseCase({
      tokenManager : mockTokenManager,
      userRepository : mockUserRepository,
    });

    const result = await getProfilUseCase.execute(payload);
    expect(result).toEqual(expectedProfil);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockUserRepository.verifyUserFound).toBeCalledWith(user.id);
    expect(mockUserRepository.getProfile).toBeCalledWith(user.id);
  });
});