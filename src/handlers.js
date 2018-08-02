const fs = require('fs');
const path = require('path');

const contentType = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
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

const resultsRoute = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'dummy.json'), (err, file) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Resource not found');
      } else {
        error(500, res, err);
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(file);
  });
};

const otherRoute = (req, res) => {
  const filename = path.basename(req.url);
  const filetype = path.extname(filename);
  fs.readFile(path.join(__dirname, '..', 'public', filename), (err, file) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Resource not found');
      } else {
        error(500, res, err);
      }
    }
    res.writeHead(200, { 'Content-Type': contentType[filetype] });
    res.end(file);
  });
};

module.exports = { homeRoute, otherRoute, resultsRoute };
