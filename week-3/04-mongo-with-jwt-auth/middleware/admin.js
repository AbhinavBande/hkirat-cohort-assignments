const jwt = require('jsonwebtoken')
const {jwtsecret, Admin} = require('../db')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.header('Authorization');

    jwt.verify(token.split('Bearer ')[1], jwtsecret, async function(err, decoded){
        if(err){
            res.sendStatus(403);
            return;
        }
        console.log(decoded);
        const user = await Admin.findOne({'username': decoded.username});
        req.user = user;
        next();
    });
}

module.exports = adminMiddleware;