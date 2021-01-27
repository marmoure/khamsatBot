#!/bin/node
require("dotenv").config();

const app = require("../express/app");

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log("pain");
});

// khamsat interval 
