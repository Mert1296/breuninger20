const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const { forwardAuthenticated } = require('../DB/config/auth');

// Startseite
router.get('/startseite_breuninger', (req, res) => res.render('startseite_breuninger'));
router.get('/startseite_spediteur', (req, res) => res.render('startseite_spediteur'));

//neue Buchung
router.get('/neueBuchung_spediteur', (req, res) => res.render('neueBuchung_spediteur'));

//insert
router.post('/neueBuchung_spediteur', (req, res) => {
    const {sendungsstruktur, datepicker, sendungen, EUP, EWP, pakete, bemerkung, teile } = req.body;
    let errors = [];
    if (errors.length > 0) {
        res.render('neueBuchung_spediteur', {
            errors,
            sendungsstruktur,
            datepicker,
            sendungen,
            EUP,
            EWP,
            pakete,
            bemerkung,
            teile
        });
    }  else {
                const newBuchung = new Buchung({
                    sendungsstruktur,
                    datepicker,
                    sendungen,
                    EUP,
                    EWP,
                    pakete,
                    bemerkung,
                    teile
                });
                newBuchung.save()
                    .then(buchung =>{
                        res.redirect('/buchungen/startseite_spediteur')
                    })
                    .catch(err=>console.log(err));
                console.log(newBuchung)
    }
});

//get Data
/*
router.get('/Buchung', (req, res) => {
    Buchung.getBuchung((err, buchung) => {
        if(err){
            throw err;
        }
        res.json(buchung);
    });
});
*/

//buchung.js einbinden
//Buchung = require('../DB/models/buchung_mitarbeiter');



module.exports = router;