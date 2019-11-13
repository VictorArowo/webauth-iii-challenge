const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'No token passed' });

  jwt.verify(
    authorization,
    'very secret key from .env file',
    (err, decoded) => {
      if (err) return res.status(401).json('Your token is invalid');
      req.userId = decoded.subject;
      next();
    }
  );
};
