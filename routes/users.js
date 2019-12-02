const express = require('express');
const router = express.Router();


// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

module.exports = router;