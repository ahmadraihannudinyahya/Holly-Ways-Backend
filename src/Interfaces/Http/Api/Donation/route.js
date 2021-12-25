const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/donation', midleware.fileHandle('proofAttachment'), handler.addDonationHandler);
  return router;
};
module.exports = route;
