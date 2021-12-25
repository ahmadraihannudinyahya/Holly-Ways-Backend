const AddDonationUseCase = require('../../../../Aplications/usecase/Donations/AddDonationUseCase');
const SetStatusSuccessDonationUseCase = require('../../../../Aplications/usecase/Donations/SetStatusSuccessDonationUseCase');

class DonationHandler {
  constructor(container) {
    this.container = container;
    this.addDonationHandler = this.addDonationHandler.bind(this);
    this.setStatusSuccessDonationHandler = this.setStatusSuccessDonationHandler.bind(this);
  }

  async addDonationHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const addDonationUseCase = this.container.getInstance(AddDonationUseCase.name);
      const id = await addDonationUseCase.execute({
        ...req.body, ...req.params, proofAttachment: req.file, token,
      });
      res.send({
        status: 'success',
        data: {
          id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async setStatusSuccessDonationHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const setStatusSuccessDonationUseCase = this.container.getInstance(SetStatusSuccessDonationUseCase.name);
      await setStatusSuccessDonationUseCase.execute({ ...req.params, token });
      res.send({
        status: 'success',
        data: {
          id: req.params.donationId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DonationHandler;
