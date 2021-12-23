const express = require('express');

const route = (handler) => {
  const router = express.Router();
  router.post('/register', handler.addUser);
  return router;
};

module.exports = route;
