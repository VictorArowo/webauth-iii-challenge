const express = require('express');
const userRouter = require('./resources/users/router');

const app = express();

app.use(express.json());

app.use('/api', userRouter);

module.exports = app;
