const express = require('express');
const router = express.Router();
// Load Buchung model
const Buchung = require('../DB/models/Buchung');
const User = require('../DB/models/User');
const Tor = require('../DB/models/Tor');
const { ensureAuthenticated } = require('../DB/config/auth');
const db = require('../DB/config/keys').MongoURI;
var MongoClient = require('mongodb').MongoClient;

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


//Tor updatenn
router.post('/torverwaltung', (req, res) => {
    //here it is
    const tor = req.body.gate;
    Tor.findOne({gate: tor}, function (err, gate) {
            res.render('torsperren', { gate: gate });
    });
});

//Torsperrung
router.post('/torsperren',(req,res) =>{
    var myquery = { gate: req.body.gate };
    var newvalues = { $set: {disabled: req.body.disabled, bemerkung: req.body.bemerkung } };
    MongoClient.connect(db, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("tor").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();

        });
        res.redirect('back');
    });
});



router.post('/neueBuchung_spediteur',ensureAuthenticated,(req, res) => {
    const {sendungsstruktur, datepicker, timepicker1, timepicker2, sendungen, EUP, EWP, pakete, bemerkung, teile } = req.body;
    var user = req.user;
    if (errors.length > 0) {
        User.findOne({username: "spedi2"}, function (err, user) {
            console.log(JSON.stringify(req.user));
            if (err) { throw err; }
            if (user) {
                res.render('neueBuchung_spediteur', {
                    gate: user.gate
                });
            }
        });
    }
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
        teile,

    });
    newBuchung.save()
        .then(buchung =>{
            res.send('saved')
        })
        .catch(err=>console.log(err));
    console.log(newBuchung)

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