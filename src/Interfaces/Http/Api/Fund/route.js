const express = require('express');

const route = (handler) => {
  const router = express.Router();
  router.post('/fund', handler.addFundHandler);
  return router;
};
module.exports = route;
