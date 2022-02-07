const { sequelize } = require('../../../utils/sequelize');
const { DataTypes, Model } = require("sequelize");

class Category extends Model { }

Category.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
}, {
    tableName: 'categories',
    paranoid: true,
    deletedAt: 'disabledAt',
    sequelize
});

module.exports = { Category };