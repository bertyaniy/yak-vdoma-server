'use strict'

const { server } = require('./src/utils/setup');

const { App } = require('./src/classes/App');

// Application starting function
(function main() {
    const app = new App(server); 
        app.startServer();
        app.connectDataBase();
})();