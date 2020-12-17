const path = require("path");

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname,"../data/db.sqlite"),
});


const modelDefiners = [
    require("./models/messages"),
    require("./models/states"),
    require("./models/users"),
    require("./models/accounts"),
];

// define all models
for(let modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// apply relationships if any exists


module.exports = sequelize;