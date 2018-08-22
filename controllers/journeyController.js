const rp = require('request-promise');
const { tflApiKey } = require('../config/environment');

let endPostCode;
let startPostcode;


function getCurrentPosition(req, res, next) {
  console.log('we are in get place', tflApiKey);
  console.log('LAT is', req.query.lat);
  console.log('LON is', req.query.lon);

  rp({
    method: 'GET',
    url: `https://api.postcodes.io/postcodes/${req.query.endPoint}`,
    json: true
  });
}


function generateOptions(req, res, next) {
  rp({
    method: 'GET',
    url: 'https://api.postcodes.io/postcodes/',
    qs: {
      lat: req.query.startLat,
      lon: req.query.startLon
    },
    json: true
  }).then(response => {
    startPostcode = response.result[0].postcode;
    return rp({
      method: 'GET',
      url: 'https://api.postcodes.io/postcodes/',
      qs: {
        lat: req.query.endLat,
        lon: req.query.endLon
      },
      json: true
    })
      .then(response => {
        tflBus = response.data.journeys[0].duration;

        return rp({
          method: 'GET',
          url: 'https://api.tfl.gov.uk/Journey/JourneyResults/',
          qs: {
            lat: req.query.startLat,
            lon: req.query.startLon,
            endLat: req.query.endLat,
            endLon: req.query.endLon,
        },
        headers: {
          'user-key': tflApiKey
        },
        skipAuthorization: true,
        json: true
      // set endpostcode onto a global
      // get tfl data (using return rp({...}))
    })
    .then(response => {
      // now we've got everything!!! res.json()
      // to return the data to the client
    });




module.exports = {
  getCurrentPosition,
  generateOptions
};
