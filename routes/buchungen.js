const express = require('express');
const app = express();
const router = express.Router();

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));
router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

//neue Buchung
router.get('/neueBuchung_spediteur', (req, res) => res.render('neueBuchung_spediteur'));

/*
router.post('/neueBuchung_spediteur', (req, res) => {
    const { sendungsstruktur, datepicker } = req.body;
    let errors = [];

    if (errors.length > 0) {
        res.render('neuerUser_MA', {
            errors,
            sendungsstruktur,
            datepicker
        });
    } else {
                const newBuchung = new Buchung({
                    sendungsstruktur,
                    datepicker
                });
    }
});

*/
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