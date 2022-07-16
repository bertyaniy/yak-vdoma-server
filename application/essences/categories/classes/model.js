const { sequelize } = require('../../../utils/sequelize');
const { DataTypes, Model } = require("sequelize");
const { Dish } = require('../../dishes/classes/model');

class Category extends Model { }

Category.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        foreignKey: true
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
    paranoid: false,
    deletedAt: 'disabledAt',
    sequelize
});


Category.associate = (models) => {
    Category.hasMany(Dish); 
}

Dish.associate = (models) => {
    Dish.belongsTo(Category);   
}


module.exports =  { Category }; 