const mongoose = require('mongoose');
const validator = require('validator');

const guestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => validator.isEmail(value)
    },
    name: {
        type: String,
        reqired: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    includedProjects: {
        type: [String],
        default: []
    },
    requests: {
        type: [String],
        default: []
    }
}, {
    collection: 'guests'
});

module.exports = mongoose.model('Guest', guestSchema);