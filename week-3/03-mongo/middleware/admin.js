const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.get('username');
    const password = req.get('password');

    let admin = await Admin.findOne({
        'username': username,
        'password': password
    })
    if(admin){
        next();
    }
    else{
        res.sendStatus(403);
    }
}

module.exports = adminMiddleware;