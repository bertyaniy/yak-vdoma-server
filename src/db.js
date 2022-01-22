'use strict'

const { Sequelize } = require('sequelize')

// Connecting to the PostgreSQL database
module.exports = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);
