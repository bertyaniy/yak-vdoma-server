'use strict'

// Setup dotenv
const dotenv = require('dotenv').config();

// Import express
const express = require('express');
const server = express();

const sequelize = require('../db');

module.exports = { server };