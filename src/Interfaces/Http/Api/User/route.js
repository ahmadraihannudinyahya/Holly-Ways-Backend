const express = require('express');

const route = (handler) => {
  const router = express.Router();
  router.get('/user', handler.getAllUserHandler);
  router.delete('/user/:userId', handler.deleteUserByIdHandler);
  return router;
};
module.exports = route;
