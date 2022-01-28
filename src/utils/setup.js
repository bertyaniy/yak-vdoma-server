'use strict'

// Setup dotenv
const dotenv = require('dotenv').config();
const cors = require('cors');

// Import express
const express = require('express');
const server = express();

const router = require('../routers/index');
const errorHandler = require('../middlewares/errorHandlingMiddleware');

server.use(cors());
server.use(express.json());
server.use('/api', router);
server.use(errorHandler); // Error handler must be last

// server.get('/', (req, res) => {
//     res.status(200).json("Test");
// });

const sequelize = require('../db');

module.exports = { server };