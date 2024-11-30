require('dotenv').config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  PORT,
  FRONTEND_URL,
  MONGODB_URI,
  JWT_SECRET_KEY
};
