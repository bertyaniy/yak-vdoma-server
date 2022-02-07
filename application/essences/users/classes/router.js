// Create router
const express = require('express');
const UsersRouter = express.Router();

// Import controller
const { UsersController } = require('./controller');

// Register routes
UsersRouter.get('/:userId', UsersController.getById);
UsersRouter.get('/', UsersController.getAll);
UsersRouter.post('/', UsersController.create);
UsersRouter.put('/:userId', UsersController.update);
UsersRouter.delete('/:userId', UsersController.delete);

// Export extended router
module.exports = { UsersRouter };