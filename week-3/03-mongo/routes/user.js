const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    let user = new User()
    user.username = req.body['username']
    user.password = req.body['password']
    user.save()
    res.sendStatus(200);
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