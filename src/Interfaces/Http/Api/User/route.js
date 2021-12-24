const express = require('express');

const route = (handler) => {
  const router = express.Router();
  router.get('/user', handler.getAllUserHandler);
  return router;
};
module.exports = route;
