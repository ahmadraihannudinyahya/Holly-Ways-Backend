const GetUser = require('../../../Domains/User/Entities/GetUser');

class GetAllUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute() {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => new GetUser(user));
  }
}
module.exports = GetAllUserUseCase;
