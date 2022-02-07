// Create router
const express = require('express');
const DishesRouter = express.Router();

// Import controller
const { DishesController } = require('./controller');

// Register routes
DishesRouter.get('/:dishId', DishesController.getById);
DishesRouter.get('/', DishesController.getAll);
DishesRouter.post('/', DishesController.create);
DishesRouter.put('/:dishId', DishesController.update);
DishesRouter.delete('/:dishId', DishesController.delete);

// Export extended router
module.exports = { DishesRouter };