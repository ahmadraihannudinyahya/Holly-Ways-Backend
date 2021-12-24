const AddFundUseCase = require('../../../../Aplications/usecase/Fund/AddFundUseCase');

class FundHandler {
  constructor(container) {
    this.container = container;

    this.addFundHandler = this.addFundHandler.bind(this);
  }

  async addFundHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const addFundUseCase = this.container.getInstance(AddFundUseCase.name);
      const fund = await addFundUseCase.execute({ ...req.body, thumbnail : req.file,token });
      res.send({
        status: 'success',
        data : {
          fund
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FundHandler;
