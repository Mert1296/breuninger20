const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
router.post('/neuerUser_MA', (req, res) => {
    const {username, name, vorname, division, strasse, plz, stadt, pickingland, telefon, email, password, reppass} = req.body;
    console.log(req.body);
    let errors = [];

    //Check password match
    if (password !== reppass) {
        errors.push({msg: 'Passwords do not match'});

    } else {
        res.send('pass');
    }

        /*
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    username,
                    name,
                    nachname,
                    //zugehoerigkeit,
                    division,
                    strasse,
                    plz,
                    stadt,
                    pickingland,
                    telefon,
                    email,
                    passwort,
                    reppass
                });
            } else {
                const newUser = new User({
                    username,
                    email,
                    passwort
                });

*/


                /*
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
    }*/
});

module.exports = router;

