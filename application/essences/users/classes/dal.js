const { User } = require('./model');
const bcrypt = require('bcrypt');

/**
 * Salt length to generate.
 * 
 * If this value will be increased,
 * salt generation may take a lot of time
 * 
 * Do not recommended to increase this
 */
const PASSWORD_SALT_LENGTH = 10;

// Data Access Layer for Users
class UsersDal {
    /**
     * @param id Target user identifier
     * 
     * @returns User
     */
    static async getById(id) {
        return User.findByPk(id, {
            raw: true
        });
    }

    /**
     * @param limit Records limit per page
     * @param offset Number of records to skip
     * @param filters Unnecessary filters object
     * 
     * @returns User[]
     */
    static async getAll(limit, offset, filters = {}) {
        return User.findAndCountAll({
            where: filters,
            offset,
            limit,
            raw: true
        });
    }

    /**
     * @param data User data to create
     * 
     * @returns User
     */
    static async create(data) {
        const { password } = data;
        const passwordSalt = await bcrypt.genSalt(PASSWORD_SALT_LENGTH);
        const hashedPassword = await bcrypt.hash(password, passwordSalt);

        // Replace plain text password with hash
        data.password = hashedPassword;

        return User.create(data);
    }

    /**
     * @param id Target user identifier
     * @param data User data to update
     * 
     * @returns User
     */
    static async update(id, data) {
        const { password } = data;
        const passwordSalt = await bcrypt.genSalt(PASSWORD_SALT_LENGTH);
        const hashedPassword = await bcrypt.hash(password, passwordSalt);

        // Replace plain text password with hash
        data.password = hashedPassword;

        await User.update(data, {
            where: { id }
        });

        return UsersDal.getById(id);
    }

    /**
     * @param id Target user identifier
     * 
     * @returns number
     */
    static async delete(id) {
        return User.destroy({
            where: { id }
        });
    }
}

module.exports = { UsersDal };