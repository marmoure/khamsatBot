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
            type: Sequelize.STRING,
            allowNull: false,
        },
        keepOn: {
            type: Sequelize.BOOLEAN,
        },
        autoReply: {
            type: Sequelize.BOOLEAN,
        },
        messenger_id: {
            type: Sequelize.STRING,
        },
        access_token: {
            type: Sequelize.STRING,
        }
    });