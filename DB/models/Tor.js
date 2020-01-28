const mongoose = require('mongoose');

const TorSchema = new mongoose.Schema({
    gate: {
        type: String,
        required: true
    },
    disabled: {
        type: String,
        required: false
    },
    bemerkung:{
        type: String,
        required: false
    }
});

const Tor = mongoose.model('Tor', TorSchema, 'tor');

module.exports = Tor;