const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    sendungsstruktur: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;