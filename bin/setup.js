const sequelize = require("../sequelize");

sequelize.sync({force: true})
.then( () => {
    console.log("DATABASE SETUP is done");
    return sequelize.models.account.create({
        username:"admin",
        password:"admin",
        keepOn:false,
        autoReply:false,
    });
})
.then(() => {
    console.log("Admin account created");
})
.catch(err => console.log(err));