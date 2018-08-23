const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or development
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/thrifty-${env}`;
const secret = process.env.SECRET || 'wdi35';
const zomatoApiKey = process.env.ZOMATO_API_KEY;
const tflAppKey = process.env.TFL_APP_KEY;
const tflAppId = process.env.TFL_APP_ID;
const uberApiKey = process.env.UBER_API_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;
const clientId = process.env.MONZO_CLIENT_ID;
const clientSecret = process.env.MONZO_CLIENT_SECRET;
const redirectUri = process.env.MONZO_REDIRECT_URI;
// MONZO KEYS



module.exports = { dbURI, port, secret, zomatoApiKey, tflAppKey, tflAppId, uberApiKey, googleApiKey, clientId, clientSecret, redirectUri };
