const LoginUserUseCase = require('../LoginUserUseCase');

const Validtion = require('../../../Validation/Validation');
const TokenManager = require('../../../Security/TokenManager');
const PasswordHash = require('../../../Security/PasswordHash');

const LoginUserRepository = require('../../../../Domains/LoginUser/LoginUserRepository');

const LoginUser = require('../../../../Domains/LoginUser/Entities/LoginUser');
const LogedinUser = require('../../../../Domains/LoginUser/Entities/LogedinUser');

describe('test LoginUserUseCase', () => {
  it('should orchestrating LoginUserUseCase corectly', async () => {
    const payload = {
      email: 'user@mail.com',
      password: 'supersecretpass',
    };
    const expectedToken = 'faketoken.justfortest';
    const expectedUser = {
      id: 'user-123',
      fullname: 'user test',
      email: payload.email,
      password: 'encriptedPass',
    };
    const loginUser = new LoginUser(payload);
    loginUser.id = expectedUser.id;
    const expectedLogedinUser = new LogedinUser({ ...expectedUser, token: expectedToken });

    const mockValidtion = new Validtion();
    const mockTokenManager = new TokenManager();
    const mockPasswordHash = new PasswordHash();
    const mockLoginUserRepository = new LoginUserRepository();

    mockValidtion.validateLoginUserPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.createToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedToken));
    mockLoginUserRepository.verifyUserByEmail = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockLoginUserRepository.getUserByEmail = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedUser));

    const loginUserUseCase = new LoginUserUseCase({
      loginUserRepository: mockLoginUserRepository,
      passwordHash: mockPasswordHash,
      tokenManager: mockTokenManager,
      validation: mockValidtion,
    });

    const result = await loginUserUseCase.execute(payload);

    expect(result).toEqual(expectedLogedinUser);
    expect(mockValidtion.validateLoginUserPayload).toBeCalledWith(payload);
    expect(mockLoginUserRepository.verifyUserByEmail).toBeCalledWith(payload.email);
    expect(mockLoginUserRepository.getUserByEmail).toBeCalledWith(payload.email);
    expect(mockPasswordHash.comparePassword).toBeCalledWith(loginUser.password, expectedUser.password);
    expect(mockTokenManager.createToken).toBeCalledWith(loginUser);
  });
});
