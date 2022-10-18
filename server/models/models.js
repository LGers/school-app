const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {});

module.exports = {
    Users,
};

