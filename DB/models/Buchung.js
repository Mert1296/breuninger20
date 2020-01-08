const mongoose = require('mongoose');

const BuchungSchema = new mongoose.Schema({
    sendungsstruktur: {
        type: String,
        required: true
    },
    datepicker: {
        type: Date,
        required: true
    }
});

const Buchung = mongoose.model('Buchung', BuchungSchema);

module.exports = Buchung;