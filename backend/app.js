const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Server OK!'));

// Controllers
const userController = require('./src/controllers/userController');
app.use('/user', userController);

module.exports = app;
