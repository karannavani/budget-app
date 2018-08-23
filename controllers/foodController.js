const rp = require('request-promise');
const { zomatoApiKey } = require('../config/environment');
// const { googleApiKey} = require('../config/environment');

function getPlace(req, res, next) {
  console.log('zomato key is', zomatoApiKey);
  rp({
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/geocode?lat=${req.query.lat}&lon=${req.query.lon}`,
    headers: {
      'user-key': zomatoApiKey
    },
    json: true
  })
    .then(response => {
      console.log('respose number 1 is ==========>', response.location);
      rp({ // second rp gets the restaurants in the local area
        method: 'GET',
        url: `https://developers.zomato.com/api/v2.1/search?entity_id=${response.location.entity_id}&$entity_type=${response.location.entity_type}&lat=${req.query.lat}&lon=${req.query.lon}&radius="300"&sort="cost"&order="asc"`,
        headers: {
          'user-key': zomatoApiKey
        },
        json: true
      })
        .then(response => {
          console.log('respose number 2 is -------->', response);
          res.json(response);
        })
        .catch(next);
    })
    .catch(next);
}



function showRestaurant(req, res, next) {
  rp({
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.query.res_id}`,
    headers: {
      'user-key': zomatoApiKey
    },
    skipAuthorization: true,
    json: true
  })
    .then(response => {
      console.log('response from RestaurantCtrl ===>', response);
      res.json(response);
    })
    .catch(next);
  // locationPhoto();
}

// function locationPhoto(req, res, next) {
//   console.log('we are in location photo');
//   rp({
//     method: 'GET',
//     url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos&key=${googleApiKey}`,
//     json: true
//   })
//     .then(response => {
//       console.log('the response from the back end is', response);
//       const placeResponse = response.candidates[0].photos[0].photo_reference;
//       console.log('THE PHOTO REFERENCE IS', placeResponse);
//       // generatePhoto(placeResponse);
//     });
//
//   rp({
//     method: 'GET',
//     url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAxCN126rYGofBifff2qPSOiRO6fQs5WZYfycD5pqGneFQMFMtjfAcfBvnLK_fxDUYrHCgzUWOulgM1Zeq1Nkjfik7CS3tuVXUBf2UF0_t5ysuNJq-VWbEvZrh4XaYIZ8FEhBE88IWOis-QwmbqU-n5vz8GhQbpHissHvsURD19NbVE3UekTr_EA&key=${googleApiKey}`,
//     json: true
//   })
//     .then(res => {
//       console.log('These are the header', res.header);
//       console.log('These are the headers', res.headers);
//       res.json(res);
//     })
//     .catch(next);
//
//
// }


module.exports ={
  getPlace: getPlace,
  showRestaurant: showRestaurant
  // locationPhoto: locationPhoto
};
