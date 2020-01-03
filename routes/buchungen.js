const express = require('express');
const app = express();


//buchung.js einbinden
Buchung = require('../DB/models/buchung_mitarbeiter');

app.get('/api/buchungen', function(req,res){
    Buchung.getBuchungen(function (err, buchung) {
        if(err){
            throw err;
        }
        res.json(buchung);
    });
});