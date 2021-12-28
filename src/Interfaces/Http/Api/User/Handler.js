const GetAllUserUseCase = require('../../../../Aplications/usecase/User/GetAllUserUseCase');
const DeleteUserByIdUseCase = require('../../../../Aplications/usecase/User/DeleteUserByIdUseCase');

class UserHandler {
  constructor(container) {
    this.container = container;

    this.getAllUserHandler = this.getAllUserHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
  }

  async getAllUserHandler(req, res, next) {
    try {
      const getAllUserUseCase = this.container.getInstance(GetAllUserUseCase.name);
      const users = await getAllUserUseCase.execute();
      res.send({
        status : 'success',
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserByIdHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const deleteUserByIdUseCase = this.container.getInstance(DeleteUserByIdUseCase.name);
      await deleteUserByIdUseCase.execute({ token, ...req.params });
      res.send({
        status: 'success',
        data: {
          id: req.params.userId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserHandler;
