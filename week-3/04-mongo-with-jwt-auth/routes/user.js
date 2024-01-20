const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course, jwtsecret} = require('../db');
const jwt = require('jsonwebtoken');
// User Routes
router.post('/signup', (req, res) => {
    let user = new User()
    user.username = req.body['username']
    user.password = req.body['password']
    user.save()
    res.sendStatus(200);
});

router.post('/signin', async (req, res) => {
    const user =  await User.findOne({'username': req.body.username});
    if(!user || user.password != req.body.password){
        res.sendStatus(403);
        return;
    }

    const token = jwt.sign({username: user.username}, jwtsecret);

    res.status(200)
        .json({
            'token': token
        });
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.status(200)
        .json({
            'courses': courses
        });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    console.log(req.user.boughtCourses);
    req.user.boughtCourses.push(req.params.courseId);
    req.user.save();
    res.sendStatus(200);
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await req.user.populate('boughtCourses');
    res.status(200)
        .json({
            'courses': user.boughtCourses
        });
});

module.exports = router