


const express = require('express');
const router = express.Router();
const { 
    addCourse, 
    getCourses, 
    deleteCourse, 
    getPendingEnrollments, 
    updateEnrollmentStatus, 
    deleteEnrollment 
} = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.use(protect);
router.use(authorize('teacher'));


router.post('/courses', addCourse);


router.get('/courses', getCourses);


router.delete('/courses/:id', deleteCourse);


router.get('/enrollments/pending', getPendingEnrollments);


router.put('/enrollments/:id', updateEnrollmentStatus);


router.delete('/enrollments/:id', deleteEnrollment);

module.exports = router;
