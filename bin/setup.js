require("dotenv").config();

const sequelize = require("../sequelize");
const ngrok = require("ngrok");
const app = require("express")();
const bodyParser = require("body-parser");
const { postWebhook, getWebhook, sendTextMessage } = require("../util/facebook");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.set("views","bin");


(async () => {
    try {
        // db stuff
        await sequelize.sync({ force: true });
        console.log("DATABASE SETUP is done");
        const verification = Math.random().toString(36).slice(2,12); 

        const user = await sequelize.models.account.create({
            username: "admin",
            password: "admin",
            keepOn: false,
            autoReply: false,
        });
        // ngrok
        const PORT = process.env.PORT || 8080;
        const url = await ngrok.connect(PORT);
        const setToken = (req, res, next) => {
            req.verify_token = verification;
            next();
        }
        // express
        app.get("/webhook",setToken,getWebhook);
        app.post("/webhook", postWebhook,async (req, res, next) => {
            const user = await sequelize.models.account.findOne(
                {
                    where: { id: 1 }
                }
            );
            await sendTextMessage(req.sender, "facebook setup Done\n now send the cookie",user.access_token);
            await sequelize.models.account.update(
                {
                    messenger_id: req.sender
                }
                , {
                    where: { id: user.id },
                }
            );
            res.sendStatus(200);
        });

        
        app.get("/", async (req, res, next) => {
            const user = await sequelize.models.account.findOne(
                {
                    where: { id: 1 }
                }
            );
            res.render("setup",{
                url,
                verification,
                token: !!user.verify_token,
                cookie: !!user.cookie,
            });
        });

        app.post("/token", async (req, res, next) => {
            const user = await sequelize.models.account.update(
                {
                    access_token: req.body.token
                }
                , {
                    where: { id:1 },
                }
            );
            res.redirect("/");
        });

        app.post("/api/cookie", async (req, res, next) => {
            const user = await sequelize.models.account.update(
                {
                    cookie: req.body.cookie
                }
                , {
                    where: { id:1 },
                }
            );
            res.redirect("/");
        });

        app.listen(PORT, () => {
            console.log(`the ngrok url is ${url}/webhook`);
            console.log(`token: ${process.env.VALIDATION_TOEKN}`);
        });

    } catch (error) {
    }
})();