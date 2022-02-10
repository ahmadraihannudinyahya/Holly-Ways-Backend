const RegisterUserUseCase = require('../RegisterUserUseCase');

const Validation = require('../../../Validation/Validation');
const TokenManager = require('../../../Security/TokenManager');
const PasswordHash = require('../../../Security/PasswordHash');
const RegisterRepository = require('../../../../Domains/RegisterUsers/RegisterRepository');

const RegisterUser = require('../../../../Domains/RegisterUsers/Entities/RegisterUser');
const RegisteredUser = require('../../../../Domains/RegisterUsers/Entities/RegisteredUser');

describe('test RegisterUserUseCase', () => {
  it('should orchestrating RegisterUserUseCase crectly', async () => {
    const payload = {
      email: 'user@mail.com',
      password: 'supersecretpass',
      fullname: 'user test',
    };
    const expectedToken = 'faketoken.jusfortest';
    const encryptedPassword = 'encryptedPasswordHash';
    const expectedUserId = 'user-123';
    const registerUser = new RegisterUser(payload);
    registerUser.id = expectedUserId;
    registerUser.hashedPassword = encryptedPassword;
    const expectedRegisteredUser = new RegisteredUser({ ...payload, token: expectedToken });

    const mockValidation = new Validation();
    const mockTokenManager = new TokenManager();
    const mockPasswordHash = new PasswordHash();
    const mockRegisterRepository = new RegisterRepository();

    mockValidation.validateRegisterUserPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.createToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedToken));
    mockPasswordHash.hashPassword = jest.fn()
      .mockImplementation(() => Promise.resolve(encryptedPassword));
    mockRegisterRepository.verifyAvailableEmail = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockRegisterRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedUserId));

    const registerUserUseCase = new RegisterUserUseCase({
      registerRepository: mockRegisterRepository,
      passwordHash: mockPasswordHash,
      tokenManager: mockTokenManager,
      validation: mockValidation,
    });

    const result = await registerUserUseCase.execute(payload);

    expect(result).toEqual(expectedRegisteredUser);
    expect(mockValidation.validateRegisterUserPayload).toBeCalledWith(payload);
    expect(mockRegisterRepository.verifyAvailableEmail).toBeCalledWith(payload.email);
    expect(mockPasswordHash.hashPassword).toBeCalledWith(payload.password);
    expect(mockRegisterRepository.addUser).toBeCalledWith(registerUser);
    expect(mockTokenManager.createToken).toBeCalledWith(registerUser);
  });
});
