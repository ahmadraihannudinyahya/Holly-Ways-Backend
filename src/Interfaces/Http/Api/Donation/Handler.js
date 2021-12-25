const AddDonationUseCase = require('../../../../Aplications/usecase/Donations/AddDonationUseCase');

class DonationHandler {
  constructor(container) {
    this.container = container;
    this.addDonationHandler = this.addDonationHandler.bind(this);
  }

  async addDonationHandler(req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(' ')[1];
      const addDonationUseCase = this.container.getInstance(AddDonationUseCase.name);
      const id = await addDonationUseCase.execute({ ...req.body, token });
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
}
module.exports = DonationHandler;
