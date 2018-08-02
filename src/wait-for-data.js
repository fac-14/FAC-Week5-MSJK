const { getGuardianData, getNYTimesData } = require('./requests');

const makeRequests = (res, query, callback) => {
  getGuardianData(res, query, callback);
  getNYTimesData(res, query, callback);
};

module.exports = makeRequests;
