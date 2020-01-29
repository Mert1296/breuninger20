const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../DB/models/User');
const Buchung = require('../DB/models/Buchung');
const { ensureAuthenticated } = require('../DB/config/auth');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const db = require('../DB/config/keys').MongoURI;

//Startseite Breuninger
router.get ('/startseite_breuninger', ensureAuthenticated, (req, res) => {

    Buchung.find(function (err, buchungen) {
        if (err)
            return res.send(err);

        res.render('startseite_breuninger',{
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

//Neue Buchung spediteur
router.get('/neueBuchung_spediteur', function(req, res, next) {
    var user = req.user;
    //you probably also want to pass this to your view
    res.render('neueBuchung_spediteur', { user: user });
});

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
    const {gate, username, sendungsstruktur, datepicker, timepicker1, timepicker2, sendungen, EUP, EWP, pakete, bemerkung, teile } = req.body;
    var user = req.user;
    const newBuchung = new Buchung({
        gate,
        username,
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
            res.render('startseite_spediteur')
        })
        .catch(err=>console.log(err));
    console.log(newBuchung)

});

module.exports = router;