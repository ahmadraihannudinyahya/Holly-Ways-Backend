class RegisterRepository{
  async verifyAvailableEmail(){
    throw new Error('RegisterRepository is abstract class');
  }
  async addUser(){
    throw new Error('RegisterRepository is abstract class');
  }
}

module.exports = RegisterRepository;