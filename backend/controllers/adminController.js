const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, username, password, role, semester, startYear, endYear, department } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            role,
            semester: role === 'student' ? semester : undefined,
            startYear: role === 'student' ? startYear : undefined,
            endYear: role === 'student' ? endYear : undefined,
            department: role === 'teacher' ? department : undefined
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Create User Error:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get courses selected by students
exports.getStudentSelectedCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('student', 'name username')
            .populate('course', 'courseCode courseTitle semester')
            .sort({ createdAt: -1 });

        res.json({ courses: enrollments });
    } catch (error) {
        console.error('Get Student Selected Courses Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get courses offered by teachers
exports.getTeacherOfferedCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('teacher', 'name department')
            .sort({ createdAt: -1 });

        res.json({ courses });
    } catch (error) {
        console.error('Get Teacher Offered Courses Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};
