

const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login, googleLogin } = require('../controllers/authController');


router.post('/login', login);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    googleLogin  
);

module.exports = router;