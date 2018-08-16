const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or development
const dbURI = process.env.DB_URI || `mongodb://localhost/thrifty-${env}`;
const secret = process.env.SECRET || 'wdi35';


module.exports = { dbURI, port, secret };
