const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    teamImg: {
        type: String,
        default: null
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
    stages: {
        type: [String],
        default: []
    }
}, {
    collection: 'teams'
})

module.exports = mongoose.model('Team', teamSchema);