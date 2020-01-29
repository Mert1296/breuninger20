const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const User = require('../DB/models/User');
const Tor = require(('../DB/models/Tor'));
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

//Buhchungsübersicht mitarbeiter
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

//torverwaltung mitarbeiter
router.get ('/torverwaltung', (req, res) =>{
    Tor.find(function (err, tor) {
        if (err)
            return res.send(err);
        res.render('torverwaltung',{
            tor: tor || [],
        });
    });
});

//Update Torverwaltung
/*router.post('/update/:id', (req, res) => {
    let tor = {};

    const gate = req.body.gate;

     let query = {_id: req.params.id}

    Tor.findOne({gate: gate}, function (err, tor) {
        Tor.update(query, tor, function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                res.redirect('/buchungen/torverwaltung');
            }
        })
    });
});
*/

//new Gate asd
router.post('/torverwaltung', (req, res) => {
    const {gate, disabled, bemerkung } = req.body;
    let errors = [];
    var tor = req.tor;
    const newTor = new Tor({
        gate,
        disabled,
        bemerkung,
    });
    newTor.save()
        .then(tor =>{
            res.send('saved')
        })
        .catch(err=>console.log(err));
    console.log(newTor)
});

//Update Benutzerdaten Breuni
/*router.post('/update_detailansicht_breuninger',(req,res) =>{
    const username = req.body.username;
    const telefon = req.body.telefon;
    const email = req.body.email;
    User.update({username: username}, telefon);
    res.render('detailansicht_breuninger');

});*/

//insert
    router.post('/neueBuchung_spediteur', (req, res) => {
        const {sendungsstruktur, datepicker, timepicker1, timepicker2, sendungen, EUP, EWP, pakete, bemerkung, teile } = req.body;
        let errors = [];
        var user = req.user;
        if (errors.length > 0) {
            res.render('neueBuchung_spediteur', {
                errors,
                sendungsstruktur,
                datepicker,
                timepicker1,
                timepicker2,
                sendungen,
                EUP,
                EWP,
                pakete,
                bemerkung,
                teile,
                gate
            });
        }  else {
            const newBuchung = new Buchung({
                sendungsstruktur,
                datepicker,
                timepicker1,
                timepicker2,
                sendungen,
                EUP,
                EWP,
                pakete,
                bemerkung,
                teile
            });
            newBuchung.save()
                .then(buchung =>{
                    res.send('saved')
                })
                .catch(err=>console.log(err));
            console.log(newBuchung)
        }
    });

//torauswahl spedi
router.get ('/neueBuchung_spediteur', (req, res) => {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('neueBuchung_spedieur',{
            gate: req.user.gate,
            buchungen: buchungen || []
        });
    });
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