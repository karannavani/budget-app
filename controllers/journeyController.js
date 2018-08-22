const rp = require('request-promise');
// const { tflApiKey } = require('../config/environment');
const { uberApiKey } = require('../config/environment');



// function getCurrentPosition(req, res, next) {
//   console.log('we are in get place', tflApiKey);
//   console.log('LAT is', req.query.lat);
//   console.log('LON is', req.query.lon);
//
//   rp({
//     method: 'GET',
//     url: `https://api.postcodes.io/postcodes/${req.query.endPoint}`,
//     json: true
//   });
// }
//
// function generateOptions(req, res, next) {
//   let startPostcode;
//   let endPostCode;
//   let uberPoolCost;
//   let uberXCost;
//   let uberPoolDuration;
//   let uberXDuration;
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
//     return rp({
//       method: 'GET',
//       url: 'https://api.postcodes.io/postcodes/',
//       qs: {
//         lat: req.query.endLat,
//         lon: req.query.endLon
//       },
//       json: true
//     }).then(response => {
//       uberPoolCost = parseFloat((response.prices[0].high_estimate + response.prices[0].low_estimate)/2);
//       uberXCost = parseFloat((response.prices[1].high_estimate + response.prices[1].low_estimate)/2);
//       uberPoolDuration = (response.prices[0].duration)/100;
//       uberXDuration = (response.prices[1].duration)/100;
//       return rp({
//         method: 'GET',
//         url: 'https://api.uber.com/v1.2/estimates/price',
//         params: {
//           start_latitude: req.query.startLat,
//           start_longitude: req.query.startLon,
//           end_latitude: req.query.endLat,
//           end_longitude: req.query.endLon
//         },
//         headers: {
//           Authorization: uberApiKey
//         },
//         skipAuthorization: true
//       });
//     })
//       .catch(next);
//   })
//     .catch(next);
// }
//res.json() to return the data to the client

function findUberOptions(req, res, next) {

  rp({
    method: 'GET',
    url: 'https://api.uber.com/v1.2/estimates/price',
    json: true,
    params: {
      start_latitude: req.query.lat,
      start_longitude: req.query.lon,
      end_latitude: req.query.endLat,
      end_longitude: req.query.endLon
    },
    headers: {
      Authorization: uberApiKey
    },
    skipAuthorization: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  // getCurrentPosition,
  // generateOptions
  findUberOptions
};
