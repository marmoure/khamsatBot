const Sequelize  = require("sequelize");

module.exports = (sequelize) =>
    sequelize.define("message", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        messageId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        service: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });