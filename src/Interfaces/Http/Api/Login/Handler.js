const LoginUserUseCase = require('../../../../Aplications/usecase/Login/LoginUserUseCase');

class LoginUserHandler{
  constructor(container){
    this.container = container;
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(req, res){
    try {
      const loginUserUsecase = this.container.getInstance(LoginUserUseCase.name);
      const user = await loginUserUsecase.execute(req.body);

      res.send({
        status : 'success',
        data : {
          user
        }
      })
    } catch (error) {
      res.send('error')
    }
  }
}
module.exports = LoginUserHandler;