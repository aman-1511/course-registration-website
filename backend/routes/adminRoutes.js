

const express = require('express');
const router = express.Router();
const { createUser, getStudentSelectedCourses, getTeacherOfferedCourses } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.use(protect);
router.use(authorize('admin'));


router.post('/users', createUser);


router.get('/courses/students', getStudentSelectedCourses);


router.get('/courses/teachers', getTeacherOfferedCourses);

module.exports = router;
