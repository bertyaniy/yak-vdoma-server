const { Category } = require('./model');

// Data Access Layer for Categories
class CategoriesDal {
    /**
     * @param id Target category identifier
     * 
     * @returns Category
     */
    static async getById(id) {
        return Category.findByPk(id, {
            raw: true
        });
    }

    /**
     * @param limit Records limit per page
     * @param offset Number of records to skip
     * @param filters Unnecessary filters object
     * 
     * @returns Category[]
     */
    static async getAll(limit, offset, filters = {}) {
        return Category.findAndCountAll({
            where: filters,
            offset,
            limit,
            raw: true
        });
    }

    /**
     * @param data Category data to create
     * 
     * @returns Category
     */
    static async create(data) {
        return Category.create(data);
    }

    /**
     * @param id Target category identifier
     * @param data Category data to update
     * 
     * @returns Category
     */
    static async update(id, data) {
        await Category.update(data, {
            where: { id }
        });

        return CategoriesDal.getById(id);
    }

    /**
     * @param id Target category identifier
     * 
     * @returns number
     */
    static async delete(id) {
        return Category.destroy({
            where: { id }
        });
    }
}

module.exports = { CategoriesDal };