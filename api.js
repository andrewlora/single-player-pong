const express = require('express');
const cors = require('cors');
const { join } = require('node:path');
const api = express();

api.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }),
);
api.use(express.static(join(__dirname, 'public')));
api.use('/', express.static('index.html'));

module.exports = api;
