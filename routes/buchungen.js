const express = require('express');
const app = express();
const router = express.Router();

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));

//buchung.js einbinden
//Buchung = require('../DB/models/buchung_mitarbeiter');

/*
app.get('/api/buchungen', function(req,res){
    Buchung.getBuchungen(function (err, buchung) {
        if(err){
            throw err;
        }
        res.json(buchung);
    });
});*/

module.exports = router;