const express = require('express');
const router = express.Router();

//buchung.js einbinden
Buchung = require('../DB/models/buchung_mitarbeiter');

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
router.post('/neuerUser_MA', (req, res) =>{
    console.log(req.body);
    res.send('hello');
});

module.exports = router;

