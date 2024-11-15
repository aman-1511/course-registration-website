
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();


exports.login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ username, role });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            userId: user._id,
            role: user.role,
            name: user.name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {

        const googleEmail = profile.emails[0].value;

        
        const role = "student";
        const password = "nil"; 

        
        let user = await User.findOne({ username: googleEmail, role });

        
        if (!user) {
            return done(null, false, { message: 'User not found!' });
        }

        
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


exports.googleLogin = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

   
    const payload = {
        userId: req.user._id,
        role: req.user.role, 
        name: req.user.name
    };

   
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

   
    res.redirect(`/student_dashboard.html?token=${token}&role=${req.user.role}`);
};