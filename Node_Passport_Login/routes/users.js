const express = require('express');
const router = express.Router();


// Register Page
router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.get('/startseite', (req, res) => res.render('startseite'));

module.exports = router;