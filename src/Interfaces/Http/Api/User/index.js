const UserHandler = require('./Handler');
const route = require('./route');

module.exports = (container, midleware) => {
  const userHandler = new UserHandler(container);
  return route(userHandler, midleware);
};
