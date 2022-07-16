// Get application start time
const appStartedAt = process.hrtime();

// Setup dotenv
const path = require('path');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '../.env')
});

// Import and create logger
const { Logger } = require('./utils/logger');
const logger = new Logger('Application');

// Import stopwatch
const { Stopwatch } = require('./utils/stopwatch');

// Import dependencies
const { ApplicationError } = require('./utils/errors');
const { RouterProxy } = require('./utils/router-proxy');
const { HttpCodes } = require('./utils/http-codes');
const { sequelize } = require('./utils/sequelize');

// Import express
const express = require('express');
const app = express();

// Import routers
const { CategoriesRouter } = require('./essences/categories');
const { DishesRouter } = require('./essences/dishes');
const { UsersRouter } = require('./essences/users');
const { RolesRouter } = require('./essences/roles');

(async function bootstrap() {
    // Establish database connection
    await sequelize.authenticate();
    /**
     * Synchronize models
     * 
     * !!! DO NOT USE THIS LINE ON PRODUCTION !!!
     */
    await sequelize.sync();

    // Disable unnecessary Express header
    app.disable('x-powered-by');

    // Register middlewares
    app.use([
        express.json(),
    ]);

    // Measure each request duration
    app.use((req, res, next) => {
        const startedAt = process.hrtime();

        res.on('finish', () => {
            const requestDuration = Stopwatch.getDuration(startedAt);
            const message =
                `Request ${req.method} ${req.originalUrl} finished in ${requestDuration}ms`

            logger.info(message);
        });

        next();
    });

    // Register routers
    app.use('/categories', new RouterProxy(CategoriesRouter));
    app.use('/dishes', new RouterProxy(DishesRouter));
    app.use('/users', new RouterProxy(UsersRouter));
    app.use('/roles', new RouterProxy(RolesRouter));

    // Healthcheck
    app.get('/ping', (req, res) => {
        res.status(200).end('Pong');
    });

    // Register error handler
    app.use(function (err, req, res, next) {
        const name = err.name;

        /**
         * Get specified error code and message.
         * Otherwise send default error
         */
        const [code, message] = (err instanceof ApplicationError)
            ? [HttpCodes[err.name], err.message]
            : [500, `Unexpected Internal Server Error: ${err.message}`];

        const response = { error: { code, name, message } };
        const responseString = JSON.stringify(response);

        logger
            .gap()
            .error(
                `Request ${req.method} ${req.originalUrl} FAILED: ${responseString}`
            )
            .gap();

        res.status(code).json(response);
    });

    app.listen(process.env.APP_PORT, () => {
        const startDuration = Stopwatch.getDuration(appStartedAt);

        logger
            .info(`The application has been started. It takes ${startDuration}ms`)
            .success('Ready for connections');
    });
})();
