const express = require('express');
const MainPageRouter = express.Router();

const { MainPageController } = require('./controller');

MainPageRouter.get('/', MainPageController.renderMainPage);

module.exports = { MainPageRouter };