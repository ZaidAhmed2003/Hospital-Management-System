const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/config');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
};

module.exports = generateToken;
