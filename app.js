require("dotenv").config();

const express = require("express");
const cool = require("cool-ascii-faces");

const wake = require("./util/heroku").wake;
const getStates = require("./util/khamsat").getStates;

const app = express();


app.use((req, res, next) => {
    res.send(cool());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});

setInterval(() => {
    getStates();
},60*1000);

setInterval(() => {
    wake();
},20*60*1000);