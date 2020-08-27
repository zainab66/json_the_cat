/*
const request = require('request');
request('https://api.thecatapi.com/v1/breeds/search?q=sib', (error, response, body) => {
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(typeof body)

  const data = JSON.parse(body);
  //console.log(data);
  //console.log(typeof data);
  console.log(data[0].weight)
  console.log(data[0].description)
console.log(process. argv)
});

*/

/*
const request = require('request');

request(('https://api.thecatapi.com/v1/breeds/search' + "?q=" + process.argv[2]), (error, response, body) => {
  const data = JSON.parse(body);
  if (process.argv.length === 2) {
    console.log('please enter a bird name');
  } else {
    if (data[0] === undefined) {
      console.log('The bird name is not found');
    } else {
      console.log(data[0].description);
    }
  }
});

*/
const request = require('request');

const fetchBreedDescription = (breedName, callback) => {
  request('https://api.thecatapi.com/v1/breeds/search?q=' + breedName, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback('Server responded with:' + response.statusCode, null);
      return;
    }
    
    const data = JSON.parse(body);
    if (!data.length) {
      callback('Cat breed not found :(', null);
      return;
    }
    
    callback(null, data[0].description.trim());
  });
};

module.exports = fetchBreedDescription;