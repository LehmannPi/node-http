const http = require('http');
const services = require('./services');
const { parse } = require('url');
const { Buffer } = require('node:buffer');

const server = http.createServer();
server.on('request', (request, response) => {
  const parsedUrl = parse(request.url, true);
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    console.log(request.headers);
  }
  const body = [];

  request
    .on('data', (chunk) => {
      body.push(chunk);
    }) // ? We need to fully receive a request body before working with it
    .on('end', () => {
      const parsedJSON = JSON.parse(Buffer.concat(body)); // * More usecases of Buffer are important to learning process
      const userName = parsedJSON[0]['userName'];
      console.log(userName);
      services.createUser(userName);
    });
});

server.listen(8080);
// ! run with:
// ! curl --header Content-Type:application/json --request POST --data @MOCK_DATA.json http://localhost:8080
