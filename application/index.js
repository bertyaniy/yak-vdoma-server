// Get application start time
const appStartedAt = process.hrtime();

// Setup dotenv
const path = require('path');
require('dotenv').config({
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
const http = require('request');

// Import routers
const { CategoriesRouter } = require('./essences/categories');
const { DishesRouter } = require('./essences/dishes');

const { MainPageRouter } = require('./pages/main');
const { OrderRouter } = require('./pages/form');

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

    app.use('/static', express.static(path.resolve('../rogorc/static')));

    // Register routers
    app.use('/categories', new RouterProxy(CategoriesRouter));
    app.use('/dishes', new RouterProxy(DishesRouter));

    app.use(new RouterProxy(MainPageRouter));
    app.use(new RouterProxy(OrderRouter));

    // Healthcheck
    app.get('/ping', (req, res) => {
        res.status(200).end('Pong');
    });

    app.post('/request', (req, res) => {

        const data = req.body;
    
        console.log(data);
        
        let msg = `
        <b>Имя: </b> ${data.name}\n\n<b>Тип заказа: </b> ${data.select}\n\n<b>Телефон: </b> ${data.phone}\n\n<b>Сообщение: </b> ${data.comment}\n\n<b>Адрес: </b> ${data.adress}`
    
        msg = encodeURI(msg);
        const url = `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage?chat_id=${process.env.TG_CHAT_ID}&parse_mode=html&text=${msg}`
    
        http.post(url);
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

        next();
    });

    app.listen(process.env.APP_PORT, () => {
        const startDuration = Stopwatch.getDuration(appStartedAt);

        logger
            .info(`The application has been started. It takes ${startDuration}ms`)
            .success('Ready for connections');
    });
})();
