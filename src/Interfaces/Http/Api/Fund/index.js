const FundHandler = require('./Handler');
const route = require('./route');

module.exports = (container, midleware) => {
  const fundHandler = new FundHandler(container);
  return route(fundHandler, midleware);
};
