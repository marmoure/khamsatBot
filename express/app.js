require("dotenv").config();

const express = require("express");
const cool = require("cool-ascii-faces");


const app = express();


app.use((req, res, next) => {
    res.send(cool());
});