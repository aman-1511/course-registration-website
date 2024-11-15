

const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');


exports.addCourse = async (req, res) => {
    const { courseTitle, courseCode, semester, credits, status } = req.body;
    const userId = req.user.userId;

   
    if (!courseCode) {
        return res.status(400).json({ message: 'Course code is required.' });
    }

    try {
        const course = new Course({
            teacher: userId,
            courseTitle,
            courseCode,
            semester,
            credits,
            status
        });

        await course.save();
        res.status(201).json({ message: 'Course added successfully.' });
    } catch (error) {
        console.error('Add Course Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};



exports.getCourses = async (req, res) => {
    const userId = req.user.userId;

    try {
        const courses = await Course.find({ teacher: userId }).sort({ createdAt: -1 });
        res.json({ courses });
    } catch (error) {
        console.error('Get Courses Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user.userId;

    try {
        const course = await Course.findOneAndDelete({ _id: courseId, teacher: userId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.json({ message: 'Course deleted successfully.' });
    } catch (error) {
        console.error('Delete Course Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.getPendingEnrollments = async (req, res) => {
    const teacherId = req.user.userId;

    try {
        const enrollments = await Enrollment.find({ status: 'pending' })
            .populate('student', 'name')
            .populate({
                path: 'course',
                match: { teacher: teacherId },
                select: 'courseTitle courseCode'
            });

      
        const filteredEnrollments = enrollments.filter(enrollment => enrollment.course);
        res.json({ enrollments: filteredEnrollments });
    } catch (error) {
        console.error('Get Pending Enrollments Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.updateEnrollmentStatus = async (req, res) => {
    const { status } = req.body;
    const enrollmentId = req.params.id;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        enrollment.status = status;
        await enrollment.save();

        res.json({ message: `Enrollment status updated to ${status}.` });
    } catch (error) {
        console.error('Update Enrollment Status Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.deleteEnrollment = async (req, res) => {
    const enrollmentId = req.params.id;

    try {
        const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        res.json({ message: 'Enrollment declined successfully.' });
    } catch (error) {
        console.error('Delete Enrollment Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};
