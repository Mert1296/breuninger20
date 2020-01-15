const mongoose = require('mongoose');

const BuchungSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    tor:{
        type: Number,
        required: false
    },
    sendungsstruktur: {
        type: String,
        required: false
    },
    from: {
        type: Date,
        required: false
    },
    to:{
        type: Date,
        required: false
    },
    sendungen: {
        type: String,
        required: false
    },
    EUP: {
        type: Number,
        required: false
    },
    EWP: {
        type: String,
        required: false
    },
    pakete: {
        type: String,
        required: false
    },
    bemerkung: {
        type: String,
        required: false
    },
    teile: {
        type: String,
        required: false
    }
});

const Buchung = module.exports = mongoose.model('Buchung', BuchungSchema,'buchungs');

module.exports.getBuchung = function(callback, limit){
    Buchung.find(callback).limit(limit);
};

//module.exports = Buchung;