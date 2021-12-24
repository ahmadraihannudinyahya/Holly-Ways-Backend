const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.post('/fund',midleware.fileHandle('thumbnail') ,handler.addFundHandler);
  return router;
};
module.exports = route;
