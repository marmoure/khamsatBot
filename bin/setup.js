const sequelize = require("../sequelize");
const Accounts = require("../sequelize/models/account");

sequelize.sync({force: true})
.then( () => {
    console.log("DATABASE SETUP is done");
    return Accounts.create({
        username:"admin",
        password:"admin",
    });
})
.then(() => {
    console.log("Admin account created");
})
.catch(err => console.log(err));