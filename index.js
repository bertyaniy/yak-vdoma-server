'use strict'

const { server } = require('./utils/setup');

const { App } = require('./classes/App');

// Application starting function
(function main() {
    const app = new App(server); 
        app.startServer();
        app.connectDataBase();
})();