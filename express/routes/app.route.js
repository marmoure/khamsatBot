const express = require("express");
const Router = express.Router();

const appController = require("../controllers/app.controller");
const {authenticateToken , authenticateUser} = require("../middleware/auth");

Router.get("/login",appController.getLogin);

Router.post("/login",authenticateUser,appController.postLogin);

Router.get("/settings",authenticateToken,appController.getSettings);

Router.post("/settings",authenticateToken,appController.postSettings);

Router.get("/track",authenticateToken,appController.getTrack);

Router.post("/track",authenticateToken,appController.postTrack);

Router.post("/untrack",authenticateToken,appController.postUnTrack);

Router.get("/logout",appController.getLogout);

module.exports = Router;