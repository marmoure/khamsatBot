const jwt = require("jsonwebtoken");

const { generateAccessToken } = require("../middleware/auth");
const sequelize = require("../../sequelize");
const {getUserData} = require("../../util/khamsat");

exports.postLogin = (req, res, next) => {
    const token = generateAccessToken(req.user.id)
    res.cookie('token', token);
    res.redirect('settings');
}

exports.getLogin = async (req, res, next) => {
    const token = req.cookies.token;
    if (token == null) return res.render("login"); 

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.render("login");
        res.redirect("settings");
    });
}

exports.getSettings = async (req, res, next) => {
    const keepOn = req.user.keepOn;
    const autoReply = req.user.autoReply;
    res.render("settings", {
        keepOn,
        autoReply,
    });
}

exports.postSettings = async (req, res, next) => {
    const keepOn = req.body.keepOn == 'on'? true:false;
    const autoReply = req.body.autoReply == 'on' ? true:false;

    await sequelize.models.account.update({ 
        keepOn,
        autoReply, 
    }, {
        where: {
            id: req.user.id
        }
    })
    res.redirect("settings");
}

exports.getTrack = async (req, res, next) => {
    const users = await sequelize.models.user.findAll();
    res.render("track",{
        users,
    });
}

exports.postTrack = async (req, res, next) => {
    const userHandler = req.body.handler
    try {
        const user = await getUserData(userHandler);
        await sequelize.models.user.create({
            name: user.name,
            handler: userHandler,
            img: user.imgUrl,
        });
        res.redirect("track");
    } catch (error) {
        return res.redirect("track");
    }
}


exports.postUnTrack = async (req, res, next) => {
    const userId = req.body.id
    try {
        await sequelize.models.user.destroy({
            where: {
                id:userId,
            }
        });
        res.redirect("track");
    } catch (error) {
        return res.redirect("track");
    }
}


exports.getLogout = (req, res, next) => {
    Object.keys(req.cookies).forEach(key => {
        res.clearCookie(key);
    });
    res.render("login");
}
