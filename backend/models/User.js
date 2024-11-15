

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
      unique: true 
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
  
    semester: {
      type: Number
    },
    startYear: {
      type: Number
    },
    endYear: {
      type: Number
    },

    department: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
