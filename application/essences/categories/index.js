const { CategoriesRouter } = require('./classes/router');
const { CategoriesDal } = require('./classes/dal');
const { Category } = require('./classes/model');

module.exports = { CategoriesRouter, CategoriesDal, Category };