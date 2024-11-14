

// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true // Added unique index for usernames
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      required: true
    },
    // Student-specific fields
    semester: {
      type: Number
    },
    startYear: {
      type: Number
    },
    endYear: {
      type: Number
    },
    // Teacher-specific fields
    department: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
