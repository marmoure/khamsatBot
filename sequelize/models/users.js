const Sequelize  = require("sequelize");

module.exports = (sequelize) =>
    sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        handler: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tracking: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false,
        }

    });