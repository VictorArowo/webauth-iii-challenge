const jwt = require('jsonwebtoken');

const generateToken = user => {
  const payload = {
    subject: user.id,
    email: user.email
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, 'very secret key from .env file', options);
};

module.exports = generateToken;
