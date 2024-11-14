// routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login, googleLogin } = require('../controllers/authController');

// Traditional login route
router.post('/login', login);

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    googleLogin  // Calls googleLogin to issue JWT after Google authentication
);

module.exports = router;