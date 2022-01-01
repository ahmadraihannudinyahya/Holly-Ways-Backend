const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/fund', midleware.fileHandle('thumbnail'), handler.addFundHandler);
  router.get('/fund', handler.getAllFundHandler);
  router.delete('/fund/:fundId', handler.deleteFundByIdHandler);
  router.get('/fund/:fundId', handler.getFundByIdHandler);
  router.patch('/fund/:fundId', midleware.fileHandle('thumbnail'), handler.editFundByIdHandler);
  router.get('/myfund', handler.getMyFundHandler);
  return router;
};
module.exports = route;
