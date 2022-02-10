const GetAllUserUseCase = require('../GetAllUserUseCase');

const UserRepository = require('../../../../Domains/User/UserRepository');

const GetUser = require('../../../../Domains/User/Entities/GetUser');

describe('test GetAllUserUseCase', () => {
  it('should orchestrating GetAllUserUseCase corectly', async () => {
    const users = [
      {
        email: 'user1@mail.com',
        fullname: 'user test 1',
        id: 'user-133',
      },
      {
        email: 'user2@mail.com',
        fullname: 'user test 2',
        id: 'user-143',
      },
      {
        email: 'user3@mail.com',
        fullname: 'user test 3',
        id: 'user-163',
      },
      {
        email: 'user4@mail.com',
        fullname: 'user test 4',
        id: 'user-128',
      },
    ];
    const expectedGetAllUsers = users.map((user) => new GetUser(user));

    const mockUserRepository = new UserRepository();

    mockUserRepository.getAllUsers = jest.fn()
      .mockImplementation(() => Promise.resolve(users));
    const getAllUserUseCase = new GetAllUserUseCase({
      userRepository: mockUserRepository,
    });

    const results = await getAllUserUseCase.execute();

    expect(results).toEqual(expectedGetAllUsers);
    expect(mockUserRepository.getAllUsers).toBeCalled();
  });
});
