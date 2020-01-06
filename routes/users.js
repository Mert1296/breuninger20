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

// Startseite
//router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));

router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

//Benutzerverwaltung_MA
router.get ('/Benutzerverwaltung_Mitarbeiter', (req, res) => res.render ('Benutzerverwaltung_Mitarbeiter'));

//New User MA
router.get ('/neuerUser_MA', (req, res) => res.render ('neuerUser_MA'));

//Test_Ausgabe
/*router.post('/neuerUser_MA', (req, res) =>{
    console.log(req.body);
    res.send('hello');
});*/

// Register
router.post('/neuerUSer_MA', (req, res) => {
    const { username, vorname, name, division, strasse, PLZ, stadt, land, telefon, email, password, password2 } = req.body;
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
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
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
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/buchungen/startseite_breuninger',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;

