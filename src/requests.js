require('dotenv').config();
const requestModule = require('request');
const { parseGuardian, parseNYTimes } = require('./parser.js');

const numberOfResults = 3;

const getGuardianData = (res, QUERYSTRING, cb) => {
  // Create Guardian Query String
  const urlGuardian = `https://content.guardianapis.com/search?q=${QUERYSTRING}&format=json&from-date=2010-01-01&page-size=5&show-tags=contributor&show-fields=headline,thumbnail,short-url,byline&order-by=newest&order-date=published&api-key=${process.env.GUARDIAN}`;
  
  // Make Request
  requestModule(urlGuardian, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    // Format and return JSON response for sending back
    cb(res, parseGuardian(body, numberOfResults));
  });
}
const getNYTimesData = (res, QUERYSTRING, cb) => {
  // Create NYT Query String
  const urlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NYTIMES}&q=${QUERYSTRING}&sort=newest&fl=headline%2C%20web_url%2C%20pub_date%2C%20byline%2C%20multimedia&page=0`;

  // Make Request
  requestModule(urlNYT, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    // Format and return JSON response for sending back
    cb(res, parseNYTimes(body, numberOfResults));
  });
};

// console.log(getGuardianData('brexit'));
// getNYTimesData('trump');

module.exports = { getGuardianData, getNYTimesData };
