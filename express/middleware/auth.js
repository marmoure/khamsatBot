const jwt = require("jsonwebtoken");

const sequelize = require("../../sequelize");

function generateAccessToken(id) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({id}, process.env.TOKEN_SECRET);
}

async function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.TOKEN_SECRET ,async (err, user) => {
      if (err) return res.sendStatus(403)
      const id = user.id;
      const activeUser = await sequelize.models.account.findOne({where: {id: id}});
      req.user = activeUser;
      next() // pass the execution off to whatever request the client intended
    })
}

async function authenticateUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await sequelize.models.account.findOne({where: {username: username}});
        if(!user) return res.sendStatus(403);
        if(user.password !== password) return res.sendStatus(403);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    authenticateUser
}