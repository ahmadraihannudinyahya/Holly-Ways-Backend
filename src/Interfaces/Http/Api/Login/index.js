const LoginUserHandler = require('./Handler');
const route = require('./route');

module.exports = (container) => {
  const loginUserHandler = new LoginUserHandler(container);
  return route(loginUserHandler);
};
