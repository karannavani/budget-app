const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or development
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/thrifty-${env}`;
const secret = process.env.SECRET || 'wdi35';
const zomatoApiKey = process.env.ZOMATO_API_KEY;
const tflAppKey = process.env.TFL_APP_KEY;
const tflAppId = process.env.TFL_APP_ID;
const uberApiKey = process.env.UBER_API_KEY;


module.exports = { dbURI, port, secret, zomatoApiKey, tflAppKey, tflAppId, uberApiKey };
