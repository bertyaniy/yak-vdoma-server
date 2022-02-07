const { RolesDal } = require('./dal');
const { NotFoundError, DatabaseError } = require('../../../utils/errors');
const { HttpCodes } = require('../../../utils/http-codes');

// Handles routes logic
class RolesController {
    /**
     * @method GET
     * @payload roleId: string
     * 
     * @returns Role
     */
    static async getById(req, res) {
        const { roleId } = req.params;
        const role = await RolesDal.getById(roleId);

        if (!role) {
            throw new NotFoundError('Role not found');
        }

        res.status(HttpCodes.OK).json({
            data: role
        });
    }

    /**
     * @method GET
     * @payload limit: number, offset: number
     * 
     * @returns Role[]
     */
    static async getAll(req, res) {
        const { limit, offset } = req.query;
        const roles = await RolesDal.getAll(limit, offset);

        res.status(HttpCodes.OK).json({
            data: roles
        });
    }

    /**
     * @method POST
     * @payload data: Role
     * 
     * @returns Role
     */
    static async create(req, res) {
        const data = req.body;

        try {
            const createdRole = await RolesDal.create(data);

            res.status(HttpCodes.CREATED).json({
                data: createdRole
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to create a role: ${error.message}`);
        }
    }

    /**
     * @method PUT
     * @payload roleId: string, data: Role
     * 
     * @returns Role
     */
    static async update(req, res) {
        const data = req.body;
        const { roleId } = req.params;
        const role = await RolesDal.getById(roleId);

        if (!role) {
            throw new NotFoundError('Role not found');
        }

        try {
            const updatedRole = await RolesDal.update(roleId, data);

            res.status(HttpCodes.OK).json({
                data: updatedRole
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to update a role: ${error.message}`);
        }
    }

    /**
     * @method DELETE
     * @payload roleId: string
     * 
     * @returns number
     */
    static async delete(req, res) {
        const { roleId } = req.params;
        const role = await RolesDal.getById(roleId);

        if (!role) {
            throw new NotFoundError('Role not found');
        }

        try {
            const deletedCount = await RolesDal.delete(roleId);

            res.status(HttpCodes.OK).json({
                data: deletedCount
            });
        } catch (error) {
            throw new DatabaseError(`Error on trying to delete a role: ${error.message}`);
        }
    }
}

module.exports = { RolesController };