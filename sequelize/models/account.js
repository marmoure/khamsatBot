const Sequelize  = require("sequelize");

module.exports = (sequelize) =>
    sequelize.define("account", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });