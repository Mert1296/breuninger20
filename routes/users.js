const express = require('express');
const router = express.Router();


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));
router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

module.exports = router;

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/startseite_breuninger',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});