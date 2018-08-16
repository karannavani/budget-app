const port = process.env.PORT || 4000;
const dbURI = process.env.DB_URI || 'mongodb://localhost/thrifty';
const secret = process.env.SECRET || 'wdi35';


module.exports = { dbURI, port, secret };
