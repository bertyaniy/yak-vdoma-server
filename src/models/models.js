const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
    email: { type: DataTypes.STRING, unique: true }, 
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Dish = sequelize.define('dish', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: false },
    // type_id: {},
    description: { type: DataTypes.STRING, allowNull: false }
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // user_id: {},
    // dish_id: {},
    rate: { type: DataTypes.INTEGER, allowNull: false }
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});

User.hasMany(Rating);
Rating.belongsTo(User);

Type.hasMany(Dish);
Dish.belongsTo(Type);

Dish.hasMany(Rating);
Rating.belongsTo(Dish);

module.exports = {
    User, Dish, Type, Rating
}