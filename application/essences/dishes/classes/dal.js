const { Dish } = require('./model');

// Data Access Layer for Dishes
class DishesDal {
    /**
     * @param id Target dish identifier
     * 
     * @returns Dish
     */
    static async getById(id) {
        return Dish.findByPk(id, {
            raw: true
        });
    }

    /**
     * @param limit Records limit per page
     * @param offset Number of records to skip
     * @param filters Unnecessary filters object
     * 
     * @returns Dish[]
     */
    static async getAll(limit, offset, filters = {}) {
        return Dish.findAndCountAll({
            where: filters,
            offset,
            limit,
            raw: true
        });
    }

    /**
     * @param data Dish data to create
     * 
     * @returns Dish
     */
    static async create(data) {
        return Dish.create(data);
    }

    /**
     * @param id Target dish identifier
     * @param data Dish data to update
     * 
     * @returns Dish
     */
    static async update(id, data) {
        await Dish.update(data, {
            where: { id }
        });

        return DishesDal.getById(id);
    }

    /**
     * @param id Target dish identifier
     * 
     * @returns number
     */
    static async delete(id) {
        return Dish.destroy({
            where: { id }
        });
    }
}

module.exports = { DishesDal };