// models/Enrollment.js

const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'not_enrolled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
