const express = require('express');
const OrderRouter = express.Router();

const { OrderPageController } = require('./controller');

OrderRouter.get('/order', OrderPageController.renderOrderPage);

module.exports = { OrderRouter };