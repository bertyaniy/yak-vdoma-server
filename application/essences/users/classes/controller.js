const { UsersDal } = require('./dal');
const { NotFoundError, DatabaseError } = require('../../../utils/errors');
const { HttpCodes } = require('../../../utils/http-codes');

// Handles routes logic
class UsersController {
    /**
     * @method GET
     * @payload userId: string
     * 
     * @returns User
     */
    static async getById(req, res) {
        const { userId } = req.params;
        const user = await UsersDal.getById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(HttpCodes.OK).json({
            data: user
        });
    }

    /**
     * @method GET
     * @payload limit: number, offset: number
     * 
     * @returns User[]
     */
    static async getAll(req, res) {
        const { limit, offset } = req.query;
        const users = await UsersDal.getAll(limit, offset);

        res.status(HttpCodes.OK).json({
            data: users
        });
    }

    /**
     * @method POST
     * @payload data: User
     * 
     * @returns User
     */
    static async create(req, res) {
        const data = req.body;

        try {
            const createdUser = await UsersDal.create(data);

            res.status(HttpCodes.CREATED).json({
                data: createdUser
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to create a user: ${error.message}`);
        }
    }

    /**
     * @method PUT
     * @payload userId: string, data: User
     * 
     * @returns User
     */
    static async update(req, res) {
        const data = req.body;
        const { userId } = req.params;
        const user = await UsersDal.getById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        try {
            const updatedUser = await UsersDal.update(userId, data);

            res.status(HttpCodes.OK).json({
                data: updatedUser
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to update a user: ${error.message}`);
        }
    }

    /**
     * @method DELETE
     * @payload userId: string
     * 
     * @returns number
     */
    static async delete(req, res) {
        const { userId } = req.params;
        const user = await UsersDal.getById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        try {
            const deletedCount = await UsersDal.delete(userId);

            res.status(HttpCodes.OK).json({
                data: deletedCount
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to delete a user: ${error.message}`);
        }
    }
}

module.exports = { UsersController };