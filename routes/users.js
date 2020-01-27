const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../DB/models/User');
const { ensureAuthenticated } = require('../DB/config/auth');
const bodyParser = require('body-parser');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Kontaktinformation Breuninger
router.get('/register', (req, res) => res.render('register'));

//Benutzerinfo Spediteur
router.get('/benutzerinfo_spediteur', function(req, res, next) {

    //here it is
    var user = req.user;

    //you probably also want to pass this to your view
    res.render('benutzerinfo_spediteur', { user: user });
});

// Detailansicht Mitarbeiter
router.post('/username', (req, res) => {

    //here it is
    const username = req.body.username;
    User.findOne({username: username}, function (err, user) {
        console.log(user);
        if (user.admin == "spediteur") {
            res.render('detailansicht_spediteur', { user: user });
        } else {
            res.render('detailansicht_breuninger', { user: user });
        }

    });

});

//Update Benutzerdaten Breuni
router.post('/update_detailansicht_breuninger',(req,res) =>{
    const username = req.body.username;
    const telefon = req.body.telefon;
    const email = req.body.email;
    User.update({username: username}, telefon);
    res.render('detailansicht_breuninger');

});

//Benutzerverwaltung_MA
router.get ('/Benutzerverwaltung_Mitarbeiter', (req, res) =>{

    User.find(function (err, users) {
        if (err)
            return res.send(err);
        res.render('Benutzerverwaltung_Mitarbeiter',{
            users: users || [],
        });
    });
});



//New User MA
    router.get('/neuerUser_MA', (req, res) => res.render('neuerUser_MA'));

// Register
    router.post('/neuerUSer_MA', (req, res) => {
        const {username, vorname, name, division, strasse, PLZ, stadt, land, telefon, email, admin, gate, password, password2} = req.body;
        let errors = [];

        if (password != password2) {
            errors.push({msg: 'Passwords do not match'});
        }

        if (password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
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
                gate,
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
                        gate,
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
                        gate,
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

//Login
    router.post(
        '/login',
        passport.authenticate('local', {
            failureRedirect: '/login'
        }), (req, res) => {
            if (req.user.admin == "spediteur") {
                res.redirect('/buchungen/startseite_spediteur');
            } else {
                res.redirect('/buchungen/startseite_breuninger');
            }
        });

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;

