const request = require("request-promise");

exports.wake = async () => {
    try {
        if(!process.env.APP_NAME) throw new Error('set the app name you idoit');
        const res = await request.get(`https://${process.env.APP_NAME}.herokuapp.com`);
        if(!res) throw new Error("no idea whats going on with no response");
    } catch (error) {
        console.log(error);
    }
}