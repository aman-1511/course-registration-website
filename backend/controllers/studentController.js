

const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.getCoursesBySemester = async (req, res) => {
    const { semester } = req.query;

    try {
        const courses = await Course.find({ semester, status: 'active' });
        res.json({ courses });
    } catch (error) {
        console.error('Get Courses Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.enrollCourse = async (req, res) => {
    const { semester, courseId, description, status } = req.body;
    const userId = req.user.userId;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        const enrollment = new Enrollment({
            student: userId,
            course: courseId,
            semester,
            description,
            status: status === 'enrolled' ? 'pending' : 'not_enrolled'
        });

        await enrollment.save();
        res.status(201).json({ message: 'Enrollment submitted.' });
    } catch (error) {
        console.error('Enroll Course Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getEnrollments = async (req, res) => {
    const userId = req.user.userId;

    try {
        const enrollments = await Enrollment.find({ student: userId })
            .populate('course', 'courseCode courseTitle')
            .sort({ createdAt: -1 });

        res.json({ enrollments });
    } catch (error) {
        console.error('Get Enrollments Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.updateEnrollment = async (req, res) => {
    const { status } = req.body;
    const enrollmentId = req.params.id;
    const userId = req.user.userId;

    try {
        const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: userId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        enrollment.status = status;
        await enrollment.save();

        res.json({ message: 'Enrollment updated.' });
    } catch (error) {
        console.error('Update Enrollment Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.deleteEnrollment = async (req, res) => {
    const enrollmentId = req.params.id;
    const userId = req.user.userId;

    try {
        const enrollment = await Enrollment.findOneAndDelete({ _id: enrollmentId, student: userId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        res.json({ message: 'Enrollment deleted.' });
    } catch (error) {
        console.error('Delete Enrollment Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};
