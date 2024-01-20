const { User } = require("../db");

async function userMiddleware(req, res, next) {
    username = req.get('username');
    password = req.get('password');

    let user = await User.findOne({
        'username': username,
        'password': password
    })
    if(user){
        req.user = user;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

module.exports = userMiddleware;