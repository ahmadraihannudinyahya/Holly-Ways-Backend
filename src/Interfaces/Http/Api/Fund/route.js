const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/fund', midleware.fileHandle('thumbnail'), handler.addFundHandler);
  router.get('/fund', handler.getAllFundHandler);
  router.delete('/fund/:fundId', handler.deleteFundByIdHandler);
  return router;
};
module.exports = route;
