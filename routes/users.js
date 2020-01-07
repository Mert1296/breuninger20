const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../DB/models/User');
const { forwardAuthenticated } = require('../DB/config/auth');

//User Models
//const User = require('../DB/models/user');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Kontaktinformation Breuninger
router.get('/register', (req, res) => res.render('register'));

//Benutzerverwaltung_MA
router.get ('/Benutzerverwaltung_Mitarbeiter', (req, res) => res.render ('Benutzerverwaltung_Mitarbeiter'));

//New User MA
router.get ('/neuerUser_MA', (req, res) => res.render ('neuerUser_MA'));

// Register
router.post('/neuerUSer_MA', (req, res) => {
    const { username, vorname, name, division, strasse, PLZ, stadt, land, telefon, email, admin, password, password2 } = req.body;
    let errors = [];

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('neuerUser_MA', {
            errors,
            username,
            vorname,
            name,
            division,
            strasse,
            PLZ,
            stadt,
            land,
            telefon,
            email,
            admin,
            password,
            password2
        });
    } else {
        User.findOne({email: email}).then(user => {
            if (user) {
                errors.push({msg: 'Email or Username already exists'});
                res.render('neuerUser_MA', {
                    errors,
                    username,
                    vorname,
                    name,
                    division,
                    strasse,
                    PLZ,
                    stadt,
                    land,
                    telefon,
                    email,
                    admin,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    username,
                    vorname,
                    name,
                    division,
                    strasse,
                    PLZ,
                    stadt,
                    land,
                    telefon,
                    email,
                    admin,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
/*
router.post('/login', (req, res, next) => {
    if (User.admin == 1) {
        passport.authenticate('local', {
            successRedirect: '/buchungen/startseite_breuninger',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    } else {
        passport.authenticate('local', {
            successRedirect: '/buchungen/startseite_spediteur',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    }
});
*/

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res) => {
        if (req.user.admin == "1") {
            res.redirect('/buchungen/startseite_spediteur');
        }
        else {
            res.redirect('/buchungen/startseite_breuninger');
        }
    });

module.exports = router;

