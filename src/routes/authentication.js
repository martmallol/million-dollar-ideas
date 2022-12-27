const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.get('/profile', (req, res) => {
    res.send('this is your Profile');
})

module.exports = router;