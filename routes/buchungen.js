const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const { forwardAuthenticated } = require('../DB/config/auth');


//Startseite Breuninger
router.route ('/Startseite_Mitarbeiter').get(function (req, res) {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('Startseite_Mitarbeiter',{
            buchungen: buchungen || []
        });
    });
});

//startseite Spedi
router.route ('/Startseite_Spediteur').get(function (req, res) {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('Startseite_Spediteur',{
            buchungen: buchungen || []
        });
    });
});

//Buhchungsübersicht spedi
router.get('/Buchungsuebersicht_Spediteur', (req, res) => res.render('Buchungsuebersicht_Spediteur'));

//torauswahl spedi
router.route ('/torauswahl').get(function (req, res) {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('torauswahl',{
            buchungen: buchungen || []
        });
    });
});


//insert
router.post('/neueBuchung_Spediteur', (req, res) => {
    const {sendungsstruktur, datepicker, sendungen, EUP, EWP, pakete, bemerkung, teile } = req.body;
    let errors = [];
    if (errors.length > 0) {
        res.render('neueBuchung_Spediteur', {
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
                        res.redirect('/buchungen/Startseite_Spediteur')
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