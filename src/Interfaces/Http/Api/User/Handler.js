const GetAllUserUseCase = require('../../../../Aplications/usecase/User/GetAllUserUseCase');

class UserHandler {
  constructor(container) {
    this.container = container;

    this.getAllUserHandler = this.getAllUserHandler.bind(this);
  }

  async getAllUserHandler(req, res, next) {
    try {
      const getAllUserUseCase = this.container.getInstance(GetAllUserUseCase.name);
      const users = await getAllUserUseCase.execute();
      res.send({
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserHandler;
