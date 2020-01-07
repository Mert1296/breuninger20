const express = require('express');
const app = express();
const router = express.Router();

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));
router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

//neue Buchung
router.get('/neueBuchung_spediteur', (req, res) => res.render('neueBuchung_spediteur'));

router.post('/neuerUSer_MA', (req, res) => {
    const { sendungsstruktur, date } = req.body;
    let errors = [];

    if (errors.length > 0) {
        res.render('neuerUser_MA', {
            errors,
            sendungsstruktur,
            date
        });
    } else {
                const newBuchung = new Buchung({
                    sendungsstruktur,
                    date
                });
    }
});



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