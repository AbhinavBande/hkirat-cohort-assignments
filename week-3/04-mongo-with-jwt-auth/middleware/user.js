const jwt = require('jsonwebtoken')
const {User, jwtsecret} = require('../db')

function userMiddleware(req, res, next) {
    const token = req.header('Authorization');

    console.log(token);

    jwt.verify(token.split('Bearer ')[1], jwtsecret, async function(err, decoded){
        if(err){
            res.sendStatus(403);
            return;
        }
        console.log(decoded);
        const user = await User.findOne({'username': decoded.username});
        if(!user){
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();    
    });
}

module.exports = userMiddleware;