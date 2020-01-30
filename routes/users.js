const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../DB/models/User');
const { ensureAuthenticated } = require('../DB/config/auth');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const db = require('../DB/config/keys').MongoURI;

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


router.post('/update_benutzerdaten_spedi', function (req,res) {
    var myquery = { username: req.body.username };
    var newvalues = { $set: {telefon: req.body.telefon, email: req.body.email } };
    MongoClient.connect(db, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();

        });
        res.redirect('/users/benutzerinfo_spediteur');
    });

});

// Detailansicht Mitarbeiter
router.post('/detailansicht', (req, res) => {
    //here it is
    const username = req.body.username;
    User.findOne({username: username}, function (err, user) {
        if (user.admin == "spediteur") {
            res.render('detailansicht_spediteur', { user: user });
        } else {
            res.render('detailansicht_breuninger', { user: user });
        }
    });
});

//Update Benutzerdaten Breuni
router.post('/update_detailansicht_breuninger',(req,res) =>{
    var timeout = 1000;
    var myquery = { username: req.body.username };
    var newvalues = { $set: {telefon: req.body.telefon, email: req.body.email, strasse: req.body.strasse, plz: req.body.plz, stadt: req.body.stadt } };
    MongoClient.connect(db, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
        setTimeout(function (err) {
            console.log('finished');
            if (err)
                throw err;
            res.redirect('/users/benutzerverwaltung_Mitarbeiter');
        }, timeout);

    });
});

//Update Benutzerdaten Spedi
router.post('/update_detailansicht_spediteur',(req,res) =>{
    var timeout = 1000;
    var myquery = { username: req.body.username };
    var newvalues = { $set: {telefon: req.body.telefon, email: req.body.email } };
    MongoClient.connect(db, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();

        });
        setTimeout(function (err) {
            console.log('finished');
            if (err)
                throw err;
            res.redirect('/users/benutzerverwaltung_Mitarbeiter');
        }, timeout);

    });
});

//User löschen
router.post('/delete',(req,res) =>{
    var myquery = { username: req.body.nutzername };
    MongoClient.connect(db, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("users").deleteOne(myquery, function(err, res) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
        res.redirect('/users/benutzerverwaltung_Mitarbeiter');
    });
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
                                    res.redirect('/users/benutzerverwaltung_mitarbeiter');
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
        passport.authenticate('local',{
            failureRedirect: '/users/login'
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

