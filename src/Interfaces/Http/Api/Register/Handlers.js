const RegisterUserUseCase = require('../../../../Aplications/usecase/Register/RegisterUserUseCase');

class RegisterHandler {
  constructor(container) {
    this.container = container;

    this.addUser = this.addUser.bind(this);
  }

  async addUser(req, res, next) {
    try {
      const registerUserUseCase = this.container.getInstance(RegisterUserUseCase.name);
      const user = await registerUserUseCase.execute(req.body);
      res.send({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RegisterHandler;
