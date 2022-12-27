const express = require('express');
const router = express.Router();
const passport = require('passport');
// "Check if a user is authenticated or not" method
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth'); 

// Sign Up
// Render Sign Up form
router.get('/signup', isNotLoggedIn, (req, res) => { // Protected with 'isNotLoggedIn'
    res.render('auth/signup'); 
});

// Receive data from the Sign Up form
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', { // Protected with 'isNotLoggedIn'
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Log In
router.get('/login', isNotLoggedIn, (req, res) => { // Protected with 'isNotLoggedIn'
    res.render('auth/login');
});

router.post('/login', isNotLoggedIn, passport.authenticate('local.login', { // Protected with 'isNotLoggedIn'
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
}));

// Profile (it must be accesible only if you logged in before)
router.get('/profile', isLoggedIn, (req, res) => { // Protected with 'isLoggedIn'
    //res.send('this is your Profile');
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => { // Protected with 'isLoggedIn'
    // "req.logout() is now an asynchronous function, whereas previously it was synchronous."
    req.logout(function(err) { // Passport method for loggin out
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;