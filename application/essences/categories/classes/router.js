// Create router
const express = require('express');
const CategoriesRouter = express.Router();

// Import controller
const { CategoriesController } = require('./controller');

// Register routes
CategoriesRouter.get('/:categoryId', CategoriesController.getById);
CategoriesRouter.get('/', CategoriesController.getAll);
CategoriesRouter.post('/', CategoriesController.create);
CategoriesRouter.put('/:categoryId', CategoriesController.update);
CategoriesRouter.delete('/:categoryId', CategoriesController.delete);

// Export extended router
module.exports = { CategoriesRouter };