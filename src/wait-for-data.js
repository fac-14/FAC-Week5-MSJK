const { getGuardianData, getNYTimesData } = require('./requests');

// Get called by handlers, with a callback
const makeRequests = (res, query, callback) => {
// Make requests
  getGuardianData(res, query, callback);
  getNYTimesData(res, query, callback);

// WAIT UNTIL BOTH RETURNED!! - Check it has 2 keys


// Then combine Guardian & NYTimes objects


// Then pass final JSON.stringified to handlers callback - res.end(JSON)
};

//makeRequests('brexit', waitForData);

module.exports = makeRequests;