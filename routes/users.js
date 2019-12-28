const express = require('express');
const router = express.Router();


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Kontaktinformation Breuninger
router.get('/register', (req, res) => res.render('register'));

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));
router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

//Benutzerverwaltung_MA
router.get ('/Benutzerverwaltung_Mitarbeiter', (req, res) => res.render ('Benutzerverwaltung_Mitarbeiter'));
//New User MA
router.get ('/neuerUser_MA', (req, res) => res.render ('neuerUser_MA'));

//Test
router.post('/neuerUser_MA', (req, res) =>{
    console.log(req.body);
    res.send('hello');
});

/*
//New User
router.post('/neuerUser_MA', (req, res) => {
    const {username, name, telefon, email, passwort, repass} = req.body;
    let errors = [];

    if (!username || !name || !telefon || !email || !passwort || !repass) {
        errors.push({msg: 'Please enter all fields'});
    }

    if (passwort !== repass) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (undefined !== passwort && passwort.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('neuerUser_MA', {
            errors,
            username,
            name,
            telefon,
            email,
            passwort,
            repass
        });
    } else {
        const newUser = new User({
            username,
            name,
            telefon,
            email,
            passwort,
            repass
        });
    }
});*/

module.exports = router;

