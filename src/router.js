const handler = require('./handlers');

const router = (req, res) => {
  if (req.url === '/') {
    handler.homeRoute(req, res);
  } else if (req.url.startsWith('/results?')) {
    handler.resultsRoute(req, res);
  } else {
    handler.otherRoute(req, res);
  }
};

module.exports = router;
