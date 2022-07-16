const { Sequelize } = require('sequelize');

// Get .env configuration
const [database, username, password, host, port, dialect] = [
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB_TYPE,
];

// Create sequelize instance with specified options
const sequelize = new Sequelize(database, username, password, {
    host, port, dialect,
    logging: (sql) => console.log(sql + '\n')
});

module.exports = { sequelize };