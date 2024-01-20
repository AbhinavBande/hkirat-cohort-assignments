const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    let user = new Admin()
    user.username = req.body['username']
    user.password = req.body['password']
    user.save()
    res.sendStatus(200);
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