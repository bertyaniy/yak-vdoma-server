'use stict'

const sequelize = require('../db');

// Main application class
class App {
    constructor(server) {
        this.server = server;
    }

    getAppPort() {
        return process.env.APP_PORT;
    }

    // Starting express server method
    async startServer() {
        const port = this.getAppPort();

        try {
            this.server.listen(port || 3000, () => {
                console.log(`Server had started on port ${port}`);
            });

        } catch(e) {
            console.log(e);
        }
    }

    // Starting PostgreSQL and Sequelize sync method
    async connectDataBase() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log(`Database had connected`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { App };