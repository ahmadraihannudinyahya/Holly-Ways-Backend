const AddFundUseCase = require('../../../../Aplications/usecase/Fund/AddFundUseCase');
const GetAllFundUseCase = require('../../../../Aplications/usecase/Fund/GetAllFundUseCase');
const DeleteFundByIdUseCase = require('../../../../Aplications/usecase/Fund/DeleteFundByIdUseCase');
const GetFundByIdUseCase = require('../../../../Aplications/usecase/Fund/GetFundByIdUseCase');
const EditFundByIdUseCase = require('../../../../Aplications/usecase/Fund/EditFundByIdUseCase');
const GetMyFundUseCase = require('../../../../Aplications/usecase/Fund/GetMyFundUseCase');

class FundHandler {
  constructor(container) {
    this.container = container;

    this.addFundHandler = this.addFundHandler.bind(this);
    this.getAllFundHandler = this.getAllFundHandler.bind(this);
    this.deleteFundByIdHandler = this.deleteFundByIdHandler.bind(this);
    this.getFundByIdHandler = this.getFundByIdHandler.bind(this);
    this.editFundByIdHandler = this.editFundByIdHandler.bind(this);
    this.getMyFundHandler = this.getMyFundHandler.bind(this);
  }

  async addFundHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const addFundUseCase = this.container.getInstance(AddFundUseCase.name);
      const fund = await addFundUseCase.execute({ ...req.body, thumbnail: req.file, token });
      res.send({
        status: 'success',
        data: {
          fund,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllFundHandler(req, res, next) {
    try {
      const getAllFundUseCase = this.container.getInstance(GetAllFundUseCase.name);
      const funds = await getAllFundUseCase.execute();
      res.send({
        status: 'success',
        data: {
          funds,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFundByIdHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const deleteFundByIdUseCase = this.container.getInstance(DeleteFundByIdUseCase.name);
      await deleteFundByIdUseCase.execute({ ...req.params, token });
      res.send({
        status: 'success',
        data: {
          id: req.params.fundId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getFundByIdHandler(req, res, next) {
    try {
      const getFundByIdUseCase = this.container.getInstance(GetFundByIdUseCase.name);
      const fund = await getFundByIdUseCase.execute(req.params.fundId);
      res.send({
        status: 'success',
        data: {
          fund,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editFundByIdHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const editFundByIdUseCase = this.container.getInstance(EditFundByIdUseCase.name);
      const fund = await editFundByIdUseCase.execute({
        id: req.params.fundId, ...req.body, thumbnail: req.file, token,
      });
      res.send({
        status: 'success',
        data: {
          fund,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyFundHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const getMyFundUseCase = this.container.getInstance(GetMyFundUseCase.name);
      const funds = await getMyFundUseCase.execute({ token });
      res.send({
        status: 'success',
        data: {
          funds,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FundHandler;
