require("dotenv").config();

const express = require("express");
const cool = require("cool-ascii-faces");
const request = require("request");

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

let msg = true;
let notif = true;
let ordr = true;

setInterval(async () => {
    let {messages, notifications, orders} = await getStates();
    console.log({messages, notifications, orders});
    let sendMsg = "";
    if(messages && msg) {
        sendMsg += `you have ${messages} new message\n`;
        msg = false;
    }
    if(notifications && notif) {
        sendMsg += `you have ${notifications} notifications\n`;
        notif = false;
    }
    if(orders && ordr) {
        sendMsg += `you have ${orders} orders \n`
        ordr = false;
    }
    if(sendMsg.length) {
        sendTextMessage("3274944712629001",`${sendMsg}`);
    }
    if(!messages) {
        msg = true;
    }
    if(!notifications) {
        notif = true;
    }
    if(!orders) {
        ordr = true;
    }
},10*1000);

setInterval(() => {
    wake();
},20*60*1000);



function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
            messaging_type: "MESSAGE_TAG",
            tag:"ACCOUNT_UPDATE"
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}