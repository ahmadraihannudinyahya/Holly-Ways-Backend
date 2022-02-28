/* istanbul ignore file */
const DeleteUserByIdUseCase = require('../DeleteUserByIdUseCase');

const TokenManager = require('../../../Security/TokenManager');
const UserRepository = require('../../../../Domains/User/UserRepository');

describe('test DeleteUserByIdUseCase', () => {
  it('should orchestrating DeleteUserByIdUseCase corectly', async () => {
    payload = {
      token: 'test.token',
      userId: 'user-123',
    };
    const mockTokenManager = new TokenManager();
    const mockUserRepository = new UserRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({ userId: payload.userId }));
    mockUserRepository.verifyUserDeleteSelf = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.deleteUserById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteUserByIdUseCase = new DeleteUserByIdUseCase({
      tokenManager: mockTokenManager,
      userRepository: mockUserRepository,
    });
    await deleteUserByIdUseCase.execute(payload);

    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockUserRepository.verifyUserDeleteSelf).toBeCalledWith(payload.userId, payload.userId);
    expect(mockUserRepository.deleteUserById).toBeCalledWith(payload.userId);
  });
});
