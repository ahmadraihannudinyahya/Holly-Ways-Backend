const DonationHandler = require('./Handler');
const route = require('./route');

module.exports = (container, midleware) => {
  const donationHandler = new DonationHandler(container);
  return route(donationHandler, midleware);
};
