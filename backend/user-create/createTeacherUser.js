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
    department: String // Teacher-specific field
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Create teacher user
async function createTeacherUser() {
    const password = 'shreya@123'; // Set a secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherUser = new User({
        name: 'shreya',
        username: 'shreya123',
        password: hashedPassword,
        role: 'teacher',
        department: 'Computer Science' // Replace with the teacher's department
    });

    await teacherUser.save();
    console.log('Teacher user created successfully');
    mongoose.connection.close();
}

createTeacherUser();
