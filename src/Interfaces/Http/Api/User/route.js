const express = require('express');

const route = (handler, midleware) => {
  const router = express.Router();
  router.get('/user', handler.getAllUserHandler);
  router.delete('/user/:userId', handler.deleteUserByIdHandler);
  router.get('/profil', handler.getProfilHandler);
  router.patch('/profil',midleware.fileHandle('image') ,handler.editProfileHandler);
  return router;
};
module.exports = route;
