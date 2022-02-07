// Create router
const express = require('express');
const RolesRouter = express.Router();

// Import controller
const { RolesController } = require('./controller');

// Register routes
RolesRouter.get('/:roleId', RolesController.getById);
RolesRouter.get('/', RolesController.getAll);
RolesRouter.post('/', RolesController.create);
RolesRouter.put('/:roleId', RolesController.update);
RolesRouter.delete('/:roleId', RolesController.delete);

// Export extended router
module.exports = { RolesRouter };