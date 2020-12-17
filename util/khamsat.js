require('dotenv').config()

const request = require("request-promise");

const getStates = async () => {
    try {
        const res = await request.get(`https://khamsat.com/ajax/account_stats?_=${Date.now()}`,{
            headers: {
                'Cookie':`rack.session=${process.env.COOKIE}`,
            },
        });
        const response = JSON.parse(res);
        const messages = +response.unread_messages_count;
        const notifications = +response.unread_notifications_count;
        const orders = +response.unread_orders_counts;
        
        return {messages, notifications, orders};
    }catch (err) {
        return Promise.reject(err);
    }
};

module.exports = getStates;
