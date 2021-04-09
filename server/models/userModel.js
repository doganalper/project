const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => validator.isEmail(value)
    },
    name: {
        type: String,
        required: true
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
    userImage: {
        type: String,
        default: null
    },
    projects: {
        type: [String],
        defalt: []
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);