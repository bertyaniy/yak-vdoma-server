const { CategoriesDal } = require('./dal');
const { NotFoundError, DatabaseError } = require('../../../utils/errors');
const { HttpCodes } = require('../../../utils/http-codes');

// Handles routes logic
class CategoriesController {
    /**
     * @method GET
     * @payload categoryId: string
     * 
     * @returns Category
     */
    static async getById(req, res) {
        const { categoryId } = req.params;
        const category = await CategoriesDal.getById(categoryId);

        if (!category) {
            throw new NotFoundError('Category not found');
        }

        res.status(HttpCodes.OK).json({
            data: category
        });
    }

    /**
     * @method GET
     * @payload limit: number, offset: number
     * 
     * @returns Category[]
     */
    static async getAll(req, res) {
        const { limit, offset } = req.query;
        const categories = await CategoriesDal.getAll(limit, offset);

        res.status(HttpCodes.OK).json({
            data: categories
        });
    }

    /**
     * @method POST
     * @payload data: Category
     * 
     * @returns Category
     */
    static async create(req, res) {
        const data = req.body;

        try {
            const createdCategory = await CategoriesDal.create(data);

            res.status(HttpCodes.CREATED).json({
                data: createdCategory
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to create a category: ${error.message}`);
        }
    }

    /**
     * @method PUT
     * @payload categoryId: string, data: Category
     * 
     * @returns Category
     */
    static async update(req, res) {
        const data = req.body;
        const { categoryId } = req.params;
        const category = await CategoriesDal.getById(categoryId);

        if (!category) {
            throw new NotFoundError('Category not found');
        }

        try {
            const updatedCategory = await CategoriesDal.update(categoryId, data);

            res.status(HttpCodes.OK).json({
                data: updatedCategory
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to update a category: ${error.message}`);
        }
    }

    /**
     * @method DELETE
     * @payload categoryId: string
     * 
     * @returns number
     */
    static async delete(req, res) {
        const { categoryId } = req.params;
        const category = await CategoriesDal.getById(categoryId);

        if (!category) {
            throw new NotFoundError('Category not found');
        }

        try {
            const deletedCount = await CategoriesDal.delete(categoryId);

            res.status(HttpCodes.OK).json({
                data: deletedCount
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to delete a category: ${error.message}`);
        }
    }
}

module.exports = { CategoriesController };