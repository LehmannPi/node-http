const https = require('https');
const services = require('../services');
const { parse } = require('url');
const jsonBody = require('body/json');

const server = https.createServer();
server.on('request', (request, response) => {
  const parsedUrl = parse(request.url, true);
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    console.log(request.headers);
  }
  jsonBody(request, response, (err, body) => {
    if (err) {
      console.log(err);
    }
    services.createUser(body['userName']);
  });
});

server.listen(8080);

// Example using body library. Run server.js then run:
// curl --header Content-Type:application/json --request POST --data @MOCK_DATA.json http://localhost:8080
// curl --header Content-Type:application/json --request POST --data '{"userName": "armen"}' http://localhost:8080
