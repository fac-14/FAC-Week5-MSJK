require('dotenv').config();
const requestModule = require('request');
const { parseGuardian, parseNYTimes } = require('./parser.js');

const getGuardianData = (QUERYSTRING) => {
  const urlGuardian = `https://content.guardianapis.com/search?q=${QUERYSTRING}&format=json&from-date=2010-01-01&page-size=5&show-tags=contributor&show-fields=headline,thumbnail,short-url,byline&order-by=newest&order-date=published&api-key=${process.env.GUARDIAN}`;
  requestModule(urlGuardian, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    return parseGuardian(body);
  });
}
const getNYTimesData = (QUERYSTRING) => {
  const urlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NYTIMES}&q=${QUERYSTRING}&sort=newest&fl=headline%2C%20web_url%2C%20pub_date%2C%20byline%2C%20multimedia&page=0`;
  requestModule(urlNYT, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    return parseNYTimes(body);
  });
};

// getGuardianData('brexit');
// getNYTimesData('trump');

module.exports = { getGuardianData, getNYTimesData };
