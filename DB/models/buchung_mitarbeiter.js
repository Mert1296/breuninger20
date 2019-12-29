var mongoose = require('mongoose');

//Buchung Schema
var buchungSchema = mongoose.Schema({
    user:{
          type: String,
          required: true
      },
    tor:{
        type: Number,
        required: true
    },
    datum:{
        type: String,
        required: true
    },
    sendungsstruktur:{
        type: String,
        required: true
    }

});

var Buchung = module.exports = mongoose.model('Buchung', buchungSchema);

//Get Buchungen
module.exports.getBuchungen = function (callback) {
    Buchung.find(callback);
};