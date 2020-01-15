const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const { forwardAuthenticated } = require('../DB/config/auth');


//Startseite Breuninger
router.route ('/startseite_breuninger').get(function (req, res) {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('startseite_breuninger',{
            buchungen: buchungen || []
        });
    });
});

//startseite Spedi
router.route ('/startseite_spediteur').get(function (req, res) {

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