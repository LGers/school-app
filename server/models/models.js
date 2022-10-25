const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Class = sequelize.define('class', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    classNumber: { type: DataTypes.INTEGER, defaultValue: 1 },
    classLetter: { type: DataTypes.STRING, defaultValue: 'A' },
});

const Class_student = sequelize.define('class_student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Class.hasMany(Users);
Class.belongsToMany(Users, { through: Class_student });

module.exports = {
    Users,
    Class,
};
