const request = require("request-promise");

exports.getStates = async () => {
    try {
        const res = await request.get("https://khamsat.com/ajax/account_stats",{
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