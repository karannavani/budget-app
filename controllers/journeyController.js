const rp = require('request-promise');
const { tflApiKey } = require('../config/environment');

// function getCurrentPosition(req, res, next) {
//   console.log('we are in get place', tflApiKey);
//   console.log('LAT is', req.query.lat);
//   console.log('LON is', req.query.lon);
//
//   rp({
//     method: 'GET',
//     url: `https://api.postcodes.io/postcodes/${req.query.endPoint}`,
//     headers: {
//       'user-key': tflApiKey
//     },
//     json: true
//   });
//
// }

// function generateOptions(req, res, next) {
//   let startPostcode;
//   rp({
//     method: 'GET',
//     url: 'https://api.postcodes.io/postcodes/',
//     qs: {
//       lat: req.query.startLat,
//       lon: req.query.startLon
//     },
//     json: true
//   }).then(response => {
//     startPostcode = response.result[0].postcode;
//     rp({
//       method: 'GET',
//       url: 'https://api.postcodes.io/postcodes/',
//       qs: {
//         lat: req.query.endLat,
//         lon: req.query.endLon
//       },
//       json: true
//     });
//   });
//
// }

function generateOptions(req, res, next) {
  const qs = req.query;

  rp({
    method: 'GET',
    url: `https://api.tfl.gov.uk/Journey/JourneyResults/${qs.lat}%2C%20-${qs.lon}/to/${qs.endLat}%2C%20-${qs.endLon}/?mode=${qs.mode}&${tflApiKey}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
//   getCurrentPosition,
  generateOptions
};
