const axios = require('axios');
const fs = require('fs');

// * First way
// axios
//   .get('http://www.google.com')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// * Second way
axios({
  method: 'get',
  url: 'http://www.google.com',
  responseType: 'stream',
})
  .then((response) => {
    response.data.pipe(fs.createWriteStream('google.html'));
  })
  .catch((error) => {
    console.log(error);
  });
