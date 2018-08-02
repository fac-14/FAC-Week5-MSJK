const tape = require('tape');
const { parseGuardian, parseNYTimes } = require('../src/parser');

const guardianData = require('./guardian.json');
const nyData = require('./nytimes.json');

const parsedGuardian = parseGuardian(JSON.stringify(guardianData), 3);
const parsedNYT = parseNYTimes(JSON.stringify(nyData), 10);

tape('test parse functions', (t) => {
  t.equal(parsedGuardian instanceof Object, true, 'Guardian parse function returns object');
  t.equal(parsedGuardian.hasOwnProperty('Guardian'), true, 'Object has key \'Guardian\'');
  t.equal(parsedNYT instanceof Object, true, 'NYT parse function returns object');
  t.equal(parsedNYT.hasOwnProperty('NYTimes'), true, 'Object has key \'NYTimes\'');
  t.end();
})
