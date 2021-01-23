const express = require("express");
const Router = express.Router();

Router.post("/post",(req, res, next) => {

    res.send("Submitted successfully");
});

module.exports = Router;