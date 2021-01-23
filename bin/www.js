#!/bin/node
require("dotenv").config();

const app = require("../express/app");


// httpServer.listen(8080);
app.listen(8080,() => {
    console.log("pain");
});