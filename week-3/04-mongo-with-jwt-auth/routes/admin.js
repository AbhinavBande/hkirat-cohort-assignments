const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course, jwtsecret } = require('../db');
const jwt = require('jsonwebtoken');

// Admin Routes
router.post('/signup', (req, res) => {
    let user = new Admin()
    user.username = req.body['username']
    user.password = req.body['password']
    user.save()
    res.status(200)
        .json({
            'message': 'Admin created successfully'
        });
});

router.post('/signin', async (req, res) => {
    const user =  await Admin.findOne({'username': req.body.username});
    if(user.password != req.body.password){
        res.sendStatus(403);
        return;
    }

    const token = jwt.sign({username: user.username}, jwtsecret);

    res.status(200)
        .json({
            'token': token
        });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const course = await Course.create(req.body);
    res.status(200)
        .json({
            'message': 'Course created successfully',
            'courseId': course._id
        });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses = await Course.find();
    res.status(200)
        .json({
            'courses': courses
        });
});


module.exports = router;