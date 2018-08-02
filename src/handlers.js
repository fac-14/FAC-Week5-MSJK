const fs = require('fs');
const path = require('path');
const makeRequests = require('./wait-for-data')
const querystring = require('querystring');

// define HTML response for 404
const notfound = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>404 - Fake News</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
  <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,700i,900" rel="stylesheet">
</head>
<body>
  <main>
    <section id="fourohfour">
      <h1>
        404 - Fake News
      </h1>
      <img src="404trump.png" alt="Trump yelling at lawn mowing boy">
      <h2>
        Looks like what you're looking for doesn't exist.
      </h2>
    </section>
  </main>
</body>
</html>`

const contentType = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

const error = (status, res, err) => {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end('server error');
  //console.log(err);
};

const homeRoute = (req, res) => {
  fs.readFile(
    path.join(__dirname, '..', 'public', 'index.html'),
    (err, file) => {
      if (err) {
        error(500, res, err);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(file);
    }
  );
};
let combinedData = [];

const waitForData = (res, data) => {
  combinedData.push(data);
  if (combinedData.length === 2) {
    let returnedObject = {};
    combinedData.forEach((item) => {
      let key = Object.keys(item);
      returnedObject[key] = item[key];
    })
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(returnedObject));
  }
};

const returnEmptySearch = (res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('{}');
}

const resultsRoute = (req, res) => {
  const query = req.url.split('=')[1];
  combinedData = [];
  if (query) {
    makeRequests(res, query, waitForData);
  } else {
    returnEmptySearch(res);
  }
};

const otherRoute = (req, res) => {
  const filename = path.basename(req.url);
  const filetype = path.extname(filename);
  fs.readFile(path.join(__dirname, '..', 'public', filename), (err, file) => {
    if (err) {
      // if path does not correspond to a file in the public folder
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(notfound);
      } else {
        error(500, res, err);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType[filetype] });
      res.end(file);
    }
  });
};

module.exports = { homeRoute, otherRoute, resultsRoute };
