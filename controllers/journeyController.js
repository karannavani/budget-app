const rp = require('request-promise');
const { tflAppKey, tflAppId } = require('../config/environment');
const { uberApiKey } = require('../config/environment');

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

//
// }

function getEndPoint(req, res, next) {
  const qs = req.query;

  rp({
    method: 'GET',
    url: `https://api.postcodes.io/postcodes/${qs.postcode}`,
    json: true
  })
    .then('backend res is', res.json)
    .then(response => res.json(response))
    .catch(next);

}

function generateTflOptions(req, res, next) {
  const qs = req.query;

  rp({
    method: 'GET',
    url: `https://api.tfl.gov.uk/Journey/JourneyResults/${qs.lat}%2C%20-${qs.lon}/to/${qs.endLat}%2C%20-${qs.endLon}?mode=${qs.mode}&app_id=${tflAppId}&app_key=${tflAppKey}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

function generateBikeOptions(req, res, next) {
  const qs = req.query;

  rp({
    method: 'GET',
    url: `https://api.tfl.gov.uk/Journey/JourneyResults/${qs.lat}%2C%20-${qs.lon}/to/${qs.endLat}%2C%20-${qs.endLon}?mode=${qs.mode}&cyclePreference=CycleHire&app_id=64435f3c&app_key=80c06668769fa9fa71b56dea2692d6e3`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

function findUberOptions(req, res, next) {
  console.log('uber', uberApiKey);
  rp({
    method: 'GET',
    url: 'https://api.uber.com/v1.2/estimates/price',
    json: true,
    qs: {
      start_latitude: req.query.lat,
      start_longitude: req.query.lon,
      end_latitude: req.query.endLat,
      end_longitude: req.query.endLon
    },
    headers: {
      Authorization: `Token ${uberApiKey}`
    },
    skipAuthorization: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
//   getCurrentPosition,
  getEndPoint,
  generateTflOptions,
  generateBikeOptions,
  findUberOptions
};
