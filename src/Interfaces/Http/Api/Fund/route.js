const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/fund', midleware.fileHandle('thumbnail'), handler.addFundHandler);
  router.get('/fund', handler.getAllFundHandler);
  return router;
};
module.exports = route;
