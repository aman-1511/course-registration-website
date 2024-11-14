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
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Create admin user
async function createAdminUser() {
    const password = 'admin@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
        name: 'admin user',
        username: 'admin123',
        password: hashedPassword,
        role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
}

createAdminUser();
