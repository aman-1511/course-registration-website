const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB URI
const uri = 'mongodb+srv://amanchaudhary3489:V493gR72USd0PX3v@cluster0.ytddk.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0'; 

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String,
    semester: Number,      // Student-specific field
    startYear: Number,     // Student-specific field
    endYear: Number        // Student-specific field
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Create student user
async function createStudentUser() {
    const password = 'aman@123'; // Set a secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentUser = new User({
        name: 'Aman Chaudhary',
        username: 'aman123',
        password: hashedPassword,
        role: 'student',
        semester: 1,       // Replace with the student's current semester
        startYear: 2021,   // Replace with the student's start year
        endYear: 2025      // Replace with the student's expected end year
    });

    await studentUser.save();
    console.log('Student user created successfully');
    mongoose.connection.close();
}

createStudentUser();
