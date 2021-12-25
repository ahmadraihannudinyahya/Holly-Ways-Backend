const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/donation/fund/:fundId', midleware.fileHandle('proofAttachment'), handler.addDonationHandler);
  router.patch('/donation/:donationId/fund/:fundId', handler.setStatusSuccessDonationHandler);
  return router;
};
module.exports = route;
