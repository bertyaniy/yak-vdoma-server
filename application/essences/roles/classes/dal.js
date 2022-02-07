const { Role } = require('./model');

// Data Access Layer for Roles
class RolesDal {
    /**
     * @param id Target role identifier
     * 
     * @returns Role
     */
    static async getById(id) {
        return Role.findByPk(id, {
            raw: true
        });
    }

    /**
     * @param limit Records limit per page
     * @param offset Number of records to skip
     * @param filters Unnecessary filters object
     * 
     * @returns Role[]
     */
    static async getAll(limit, offset, filters = {}) {
        return Role.findAndCountAll({
            where: filters,
            offset,
            limit,
            raw: true
        });
    }

    /**
     * @param data Role data to create
     * 
     * @returns Role
     */
    static async create(data) {
        return Role.create(data);
    }

    /**
     * @param id Target role identifier
     * @param data Role data to update
     * 
     * @returns Role
     */
    static async update(id, data) {
        await Role.update(data, {
            where: { id }
        });

        return RolesDal.getById(id);
    }

    /**
     * @param id Target role identifier
     * 
     * @returns number
     */
    static async delete(id) {
        return Role.destroy({
            where: { id }
        });
    }
}

module.exports = { RolesDal };