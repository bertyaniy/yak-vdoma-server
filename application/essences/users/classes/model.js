const { sequelize } = require('../../../utils/sequelize');
const { DataTypes, Model } = require("sequelize");

class User extends Model { }

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER',
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
    tableName: 'users',
    paranoid: true,
    deletedAt: 'disabledAt',
    sequelize
});

module.exports = { User };