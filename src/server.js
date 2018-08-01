const http = require("http");
const router = require("./router");
const server = http.createServer(router);
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
server.listen(port, () => {
  console.log(`Server is listening at: http://${hostname}:${port}`);
});
