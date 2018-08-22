const rp = require('request-promise');
const { zomatoApiKey } = require('../config/environment');

function getPlace(req, res, next) {
  console.log('we are in get place', zomatoApiKey);
  console.log('THIS IS LAT', req.query.lat);
  console.log('THIS IS LON', req.query.lon);
  rp({
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/geocode?lat=${req.query.lat}&lon=${req.query.lon}`,
    headers: {
      'user-key': zomatoApiKey
    },
    json: true
  })
    .then(response => {
      console.log('respose number 1 is ==========>', response.location); // this is the subzone
      // res.json(response.location.entity_id);
      rp({
        method: 'GET',
        url: `https://developers.zomato.com/api/v2.1/search?entity_id=${response.location.entity_id}&$entity_type=${response.location.entity_type}&lat=${req.query.lat}&lon=${req.query.lon}&radius="300"&sort="cost"&order="asc"`,
        headers: {
          'user-key': zomatoApiKey
        },
        json: true
      })
        .then(response => {
          console.log('respose number 2 is -------->', response); // this is the subzone
          res.json(response);
        })
        .catch(next);
    })
    .catch(next);
}

function showRestaurant(req, res, next) {
  console.log('we are in the showRestaurant controller and the ID is', req.query.res_id);
  console.log('RESPONSE 22222222', req.query);
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
      console.log('response from RestaurantCtrl ===>>>>>>>', response);
      res.json(response);
    })
    .catch(next);
}



module.exports ={
  getPlace: getPlace,
  showRestaurant: showRestaurant
};
