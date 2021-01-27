const request = require("request-promise");

exports.sendTextMessage =async (sender, text,token) => {
    messageData = {
        text:text
    }
    return await request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
            messaging_type: "MESSAGE_TAG",
            tag:"ACCOUNT_UPDATE"
        }
    });
}

exports.getWebhook = (req, res, next) => {
    let verify_token = req.verify_token;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (!mode || !token) return res.status(403).send("\nnopeee");

    if (mode == 'subscribe' && token == verify_token) {
        console.log("subbed");
        return res.status(200).send(challenge);
    } else {
        return res.status(403).send("\nnope");
    }
};


exports.postWebhook = (req, res, next) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];

        let sender = event.sender.id;
        req.sender = sender;
        if (event.message && event.message.text) {
            let text = event.message.text;
            req.message = text;
        };
    }
    next();
};