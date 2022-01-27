'use strict'

// Setup dotenv
const dotenv = require('dotenv').config();
const cors = require('cors');

// Import express
const express = require('express');
const server = express();

const router = require('../routers/index');

server.use(cors());
server.use(express.json());
server.use('/api', router);

// server.get('/', (req, res) => {
//     res.status(200).json("Test");
// });

const sequelize = require('../db');

module.exports = { server };