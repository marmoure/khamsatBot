require('dotenv').config()
const path = require("path");
const fs = require("fs").promises;

const request = require("request-promise");
const cheerio = require("cheerio");

const reply = "شكرا على الاتصال بنا سوف اعود اليك في اقرب وقت \n يمكنك الاطمئنان انت في ايادي امنة"

const getUnreadMessages = async () => {
    try {
        const html = await request.get("https://khamsat.com/messages", {
            headers: {
                'Cookie': `rack.session=${process.env.COOKIE}`
            }
        });

        const $ = cheerio.load(html);
        const messages = {};

        $(".highlight").each((i, col) => {
            let id = $(col).attr('id');
            let user = $(`#${id} .user`).text().trim();
            let key = id.split("-")[1];
            messages[key] = {
                user: user,
                id: key,
            }
        });
        
        return messages;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const markMessageAsRead = async (id) => {
    try {
        const html = await request.get(`https://khamsat.com/message/${id}`, {
            headers: {
                'Cookie': `rack.session=${process.env.COOKIE}`,

            },
        });
        const $ = await cheerio.load(html);

        let token = $("#user_token").attr("value");
        let text = $(".discussion-message").last().text().trim();
        return {text,token};
    } catch (error) {
        console.log(error);
        return null;
    }
};

const sendMessage = async (id, token, message) => {
    try {
        await request.post(`https://khamsat.com/message/${id}`, {
            headers: {
                'Cookie': `rack.session=${process.env.COOKIE}`,
            },
            form: {
                token: token,
                content: message,
            }
        })
    } catch (error) {
        console.log(error);
        return null;

    }
};

const replyToNewMessages = async () => {
    try {

        let newMessages = await getUnreadMessages();
        
        Object.entries(newMessages).forEach(async ([key,value]) => {
            let messageObj = {};
            let {text,token} = await markMessageAsRead(key);
            messageObj.user = value.user;
            messageObj.id = key;
            messageObj.token = token;
            messageObj.text = text;
            
            await sendMessage(messageObj.id,messageObj.token,reply);
        });

    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
};

const getStates = async () => {
    try {
        const res = await request.get(`https://khamsat.com/ajax/account_stats?_=${Date.now()}`,{
            headers: {
                'Cookie': `rack.session=${process.env.COOKIE}`,
            }
        });
        const response = JSON.parse(res);
        const messages = +response.unread_messages_count;
        const notifications = +response.unread_notifications_count;
        const orders = +response.unread_orders_counts;
        
        return {messages, notifications, orders};

    }catch (err) {
        console.log(err);
        return null;
    }
};

const getAllMessages = async () => {
    try {
        const html = await request.get("https://khamsat.com/messages", {
            headers: {
                'Cookie': `rack.session=${process.env.COOKIE}`
            }
        });

        const $ = cheerio.load(html);
        const messages = {};

        let arr = $(".message").toArray();
        for(let col of arr) {
            let id = $(col).attr('id');
            let user = $(`#${id} .user`).text().trim();
            let key = id.split("-")[1];
            let {text,token} = await markMessageAsRead(key);
            
            messages[key] = {
                user: user,
                id: key,
                text:text,
                token:token,
            }
        }

        return messages;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserData = async (handler) => {
    try {
        const res = await request.get(`https://khamsat.com/user/${handler}`);
        const $ = cheerio.load(res);
        let name = $("title").text().split("-")[0].trim();
        let imgUrl = $(".u-circle.img-shadow").attr("src");

        return {
            name,
            imgUrl
        }

    }catch(e) {
        return null;
    }
};

exports.replyToNewMessages = replyToNewMessages;

exports.getStates = getStates;

exports.getAllMessages = getAllMessages;

exports.getUserData = getUserData;
