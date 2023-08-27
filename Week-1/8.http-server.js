const http = require('node:http');
const { findAvailablePort } = require('./9.free-port.js');

const desiredPort = process.argv[2] ?? '3000';

const server = http.createServer((req, res) => {
  console.log('request received');
  res.end('response sent'); //termina la comunicacion
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
  });
});
