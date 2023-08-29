const http = require('node:http');
const rickSanchez = require('./rickandmorty/rickSanchez.json');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/rickandmorty/ricksanchez':
          res.setHeader('Content-type', 'application/json', 'charset=utf-8');
          return res.end(JSON.stringify(rickSanchez));
        default:
          res.statusCode = 404;
          res.setHeader('Content-type', 'text/html', 'charset=utf-8');
          return res.end('<h1>404</h1>');
      }
    case 'POST':
      switch (url) {
        case '/character':
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8',
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        default:
          res.statusCode = 404;
          res.setHeader('Content-type', 'text/html', 'charset=utf-8');
          return res.end('<h1>404</h1>');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log('server listening on port 3000');
});
