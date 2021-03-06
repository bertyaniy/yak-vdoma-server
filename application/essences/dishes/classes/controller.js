const { DishesDal } = require('./dal');
const { NotFoundError, DatabaseError, UnauthorizedError } = require('../../../utils/errors');
const { HttpCodes } = require('../../../utils/http-codes');
const { Category } = require('../../categories');

const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

// Handles routes logic
class DishesController {
    /**
     * @method GET
     * @payload dishId: string
     * 
     * @returns Dish
     */
    static async getById(req, res) {
        const { dishId } = req.params;
        const dish = await DishesDal.getById(dishId);

        if (!dish) {
            throw new NotFoundError('Dish not found');
        }

        res.status(HttpCodes.OK).json({
            data: dish
        });
    }

    /**
     * @method GET
     * @payload limit: number, offset: number
     * 
     * @returns Dish[]
     */
    static async getAll(req, res) {
        const { limit, offset } = req.query;
        const dishes = await DishesDal.getAll(limit, offset);

        res.status(HttpCodes.OK).json({
            data: dishes
        });
    }

    /**
     * @method POST
     * @payload data: Dish
     * 
     * @returns Dish
     */
    static async create(req, res) {
        const data = req.body;

        if (!data.secret || data.secret != process.env.SECRET) {
            throw new UnauthorizedError('Secret key error');
        }

        const categoryId = data.categoryId;

        const category = Boolean(categoryId)
            ? await Category.findOne({
                id: categoryId,
            })
            : null;

        // If dish category specified, but no category was found
        if (Boolean(categoryId) && !category) {
            throw new NotFoundError('Category doesn\'t exists');
        }

        try {
            const createdDish = await DishesDal.create(data);

            res.status(HttpCodes.CREATED).json({
                data: createdDish
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to create a dish: ${error.message}`);
        }
    }

    /**
     * @method PUT
     * @payload dishId: string, data: Dish
     * 
     * @returns Dish
     */
    static async update(req, res) {
        const data = req.body;

        if (!data.secret || data.secret != process.env.SECRET) {
            throw new UnauthorizedError('Secret key error');
        }

        const { dishId } = req.params;
        const dish = await DishesDal.getById(dishId);

        if (!dish) {
            throw new NotFoundError('Dish not found');
        }

        try {
            const updatedDish = await DishesDal.update(dishId, data);

            res.status(HttpCodes.OK).json({
                data: updatedDish
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to update a dish: ${error.message}`);
        }
    }

    /**
     * @method DELETE
     * @payload dishId: string
     * 
     * @returns number
     */
    static async delete(req, res) {
        const data = req.body;
        
        if (!data.secret || data.secret != process.env.SECRET) {
            throw new UnauthorizedError('Secret key error');
        }

        const { dishId } = req.params;
        const dish = await DishesDal.getById(dishId);

        if (!dish) {
            throw new NotFoundError('Dish not found');
        }

        try {
            const deletedCount = await DishesDal.delete(dishId);

            res.status(HttpCodes.OK).json({
                data: deletedCount
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to delete a dish: ${error.message}`);
        }
    }
}

module.exports = { DishesController };