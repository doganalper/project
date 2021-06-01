const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    admins: {
        type: [String],
        default: [],
        required: true
    },
    members: {
        type: [String],
        default: []
    },
    teams: {
        type: [String],
        default: []
    },
    guests: {
        type: [String],
        default: []
    },
    requests: {
        type: [String],
        default: []
    }
}, {
    collection: 'projects'
})

module.exports = mongoose.model('Project', projectModel);