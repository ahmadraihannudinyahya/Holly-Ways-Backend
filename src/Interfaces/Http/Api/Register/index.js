const RegisterHandler = require('./Handlers');
const route = require('./route');

module.exports = (container) => {
  const registerHandler = new RegisterHandler(container);
  return route(registerHandler);
};
