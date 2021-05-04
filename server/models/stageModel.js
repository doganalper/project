const mongoose = require('mongoose');

const stageModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Stage"
    },
    teamId: {
        type: String,
        required: true
    },
    jobs: {
        type: Array,
        default: []
    }
}, {
    collection: 'stages'
});

module.exports = mongoose.model('Stage', stageModel);