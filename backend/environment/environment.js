require('dotenv').config();

const {
  PORT,
  FRONTEND_URL,
  MONGODB_URI,
  JWT_SECRET_KEY
} = process.env;

module.exports = {
  PORT,
  FRONTEND_URL,
  MONGODB_URI,
  JWT_SECRET_KEY
};
