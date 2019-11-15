const express = require('express');
const router = express.Router();
const { login, signup, getUsers } = require('./controllers');
const { verifyToken } = require('./middlewares');

router.post('/login', login);
router.post('/signup', signup);
router.get('/users', verifyToken, getUsers);

module.exports = router;
