const express = require('express');

const route = (handler) => {
  const router = express.Router();
  router.post('/login', handler.loginUser);
  return router;
};

module.exports = route;
