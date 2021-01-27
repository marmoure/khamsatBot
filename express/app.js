require("dotenv").config();

const path = require("path");

const express = require("express");
const cool = require("cool-ascii-faces");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const apiRoute = require("./routes/api.route");
const appRoute = require("./routes/app.route");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"./public")));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views","express/views");

app.use("/api",apiRoute);

app.use("/",appRoute);


app.use((req, res, next) => {
    res.redirect("login");
});


module.exports = app;