const { sequelize } = require('../../../utils/sequelize');
const { DataTypes, Model } = require("sequelize");
const { Category } = require('../../categories/classes/model');

/**
 * Filename of default dish picture in storage
 */
const DISH_DEFAULT_PICTURE_NAME = 'default.jpg';

class Dish extends Model { }

Dish.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DISH_DEFAULT_PICTURE_NAME
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    disabledAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
    }
}, {
    tableName: 'dishes',
    paranoid: true,
    deletedAt: 'disabledAt',
    sequelize
});

Category.hasMany(Dish, { foreignKey: 'categoryId' });
Dish.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { Dish } ;