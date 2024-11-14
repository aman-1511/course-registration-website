

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

// Apply authentication and authorization middleware
router.use(protect);
router.use(authorize('teacher'));

// Route to add a new course
router.post('/courses', addCourse);

// Route to get all courses taught by the teacher
router.get('/courses', getCourses);

// Route to delete a course
router.delete('/courses/:id', deleteCourse);

// Route to get pending enrollments for teacher's courses
router.get('/enrollments/pending', getPendingEnrollments);

// Route to update enrollment status (e.g., accept enrollment)
router.put('/enrollments/:id', updateEnrollmentStatus);

// Route to delete an enrollment (decline enrollment request)
router.delete('/enrollments/:id', deleteEnrollment);

module.exports = router;
