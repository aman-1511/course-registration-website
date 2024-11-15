const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const uri = process.env.MONGO_URI;


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String,
    department: String // Teacher-specific field
});

const User = mongoose.model('User', userSchema);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


async function createTeacherUser() {
    const password = 'shreya@123'; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherUser = new User({
        name: 'shreya',
        username: 'shreya123',
        password: hashedPassword,
        role: 'teacher',
        department: 'Computer Science' 
    });

    await teacherUser.save();
    console.log('Teacher user created successfully');
    mongoose.connection.close();
}

createTeacherUser();
