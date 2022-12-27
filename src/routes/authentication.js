const express = require('express');
const router = express.Router();
const passport = require('passport');

// Sign Up
// Render Sign Up form
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// Receive data from the Sign Up form
router.post('/signup',  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Log In
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
}));

// Profile
router.get('/profile', (req, res) => {
    res.send('this is your Profile');
});


module.exports = router;