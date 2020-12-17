const Sequelize  = require("sequelize");

module.exports = (sequelize) =>
    sequelize.define("state", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        messages: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        orders: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        notifications: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

    });