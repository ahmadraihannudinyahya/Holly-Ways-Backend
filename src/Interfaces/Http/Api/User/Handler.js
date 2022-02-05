const GetAllUserUseCase = require('../../../../Aplications/usecase/User/GetAllUserUseCase');
const DeleteUserByIdUseCase = require('../../../../Aplications/usecase/User/DeleteUserByIdUseCase');
const GetProfilUseCase = require('../../../../Aplications/usecase/User/GetProfilUseCase');
const EditProfileUseCase = require('../../../../Aplications/usecase/User/EditProfileUseCase');

class UserHandler {
  constructor(container) {
    this.container = container;

    this.getAllUserHandler = this.getAllUserHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
    this.getProfilHandler = this.getProfilHandler.bind(this);
    this.editProfileHandler = this.editProfileHandler.bind(this);
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
      /* istanbul ignore next */
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

  async getProfilHandler(req, res, next){
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const getProfilUseCase = this.container.getInstance(GetProfilUseCase.name);
      const user = await getProfilUseCase.execute({token});
      res.send({
        status : 'success',
        data : {
          user
        }
      })
    } catch (error) {
      next(error);
    }
  }

  async editProfileHandler(req, res, next){
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const editProfileUseCase = this.container.getInstance(EditProfileUseCase.name);
      await editProfileUseCase.execute({token, ...req.body, image : req.file});
      res.send({
        status : 'success', 
      });
    } catch (error) {
      next(error);
    };
  }
}

module.exports = UserHandler;
