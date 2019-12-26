const express = require('express');
const router = express.Router();


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Startseite
router.get('/startseite', (req, res) => res.render('startseite'));

module.exports = router;