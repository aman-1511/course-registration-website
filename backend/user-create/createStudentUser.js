const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const uri = process.env.MONGO_URI;


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String,
    semester: Number,      
    startYear: Number,     
    endYear: Number        
});

const User = mongoose.model('User', userSchema);


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


async function createStudentUser() {
    const password = 'aman@123'; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentUser = new User({
        name: 'Aman Chaudhary',
        username: 'aman123',
        password: hashedPassword,
        role: 'student',
        semester: 1,       
        startYear: 2021,   
        endYear: 2025      
    });

    await studentUser.save();
    console.log('Student user created successfully');
    mongoose.connection.close();
}

createStudentUser();
