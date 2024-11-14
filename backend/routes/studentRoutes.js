// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const { getCoursesBySemester, enrollCourse, getEnrollments, updateEnrollment, deleteEnrollment } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all routes below
router.use(protect);
router.use(authorize('student'));


router.get('/courses', getCoursesBySemester);


router.post('/enroll', enrollCourse);

router.get('/enrollments', getEnrollments);


router.put('/enroll/:id', updateEnrollment);


router.delete('/enroll/:id', deleteEnrollment);

module.exports = router;
