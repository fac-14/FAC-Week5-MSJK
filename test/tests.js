const tape = require('tape');
require('dotenv').config();
//const envJS = require('../env.js');

tape('check tape is working', (t) => {
  const expected = 2;
  t.equal(1 + 1, expected, '2 should equal 2');
  t.end();
});

tape('check environment vars are set', (t) => {
  t.equal((process.env.GUARDIAN === undefined), false, 'Guardian API key should not be undefined');
  t.equal((process.env.NYTIMES === undefined), false, 'NY Times API key should not be undefined');
  t.end();
})