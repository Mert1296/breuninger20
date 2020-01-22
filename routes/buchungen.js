const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const { ensureAuthenticated } = require('../DB/config/auth');

//Startseite Breuninger
router.get ('/startseite_breuninger', ensureAuthenticated, (req, res) => {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('startseite_breuninger',{
            vorname: req.user.vorname,
            buchungen: buchungen || []
        });
    });
});

//Calendar Mirza
router.get('/calendar', (req, res) => res.render('calendar'));

//startseite Spedi
router.get ('/startseite_spediteur', ensureAuthenticated, (req, res) => {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('startseite_spediteur',{
            buchungen: buchungen || []
        });
    });
});

//Buhchungsübersicht spedi
router.get('/buchungsuebersicht', (req, res) => res.render('buchungsuebersicht'));
//Buhchungsübersicht spedi
router.get('/neueBuchung_spediteur', (req, res) => res.render('neueBuchung_spediteur'));

//torauswahl spedi
router.get ('/torauswahl', (req, res) => {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('torauswahl',{
            buchungen: buchungen || []
        });
    });
});


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
                        res.redirect('/buchungen/torauswahl')
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