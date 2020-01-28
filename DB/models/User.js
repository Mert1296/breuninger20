const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    vorname: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false
    },
    strasse: {
        type: String,
        required: false
    },
    PLZ: {
        type: String,
        required: false
    },
    stadt: {
        type: String,
        required: false
    },
    land: {
        type: String,
        required: false
    },
    telefon: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: false
    },
    gate: {
        type: [String],
        required: false
    },
   /* createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Buchung'
    }]*/
});

const User = mongoose.model('User', UserSchema);

module.exports = User;