const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stageId: {
        type: String,
        required: true
    },
    assigned: {
        type: String,
        default: null
    },
    dueDate: {
        type: Date,
        default: null
    },
    subWorks: {
        type: Array,
        default: []
    }
}, {
    collection: 'jobs'
});

module.exports = mongoose.model('Job', jobModel);