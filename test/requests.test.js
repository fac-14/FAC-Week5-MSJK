const tape = require('tape');
const { getGuardianData, getNYTimesData } = require('../src/requests'); 

tape('Test Guardian API call', (t) => {
  getGuardianData(null, 'brexit', (res, data) => {
    t.equal(data instanceof Object, true, 'data returned is an object');
    t.equal(data.hasOwnProperty('Guardian'), true, 'data returned has key \'Guardian\'');
    t.end();
  });
});
