const { sequelize } = require('../../../utils/sequelize');
const { DataTypes, Model } = require("sequelize");

class Role extends Model { }

Role.init({
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
    description: {
        type: DataTypes.STRING,
        allowNull: true,
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
    tableName: 'roles',
    paranoid: true,
    deletedAt: 'disabledAt',
    sequelize
});

module.exports = { Role };