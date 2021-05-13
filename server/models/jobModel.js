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
    description: {
        type: 'String',
        default: null
    },
    assignedId: {
        type: String || null,
        default: null
    },
    dueDate: {
        type: Date,
        default: null
    },
    subWorks: {
        type: Array,
        default: []
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    comments: {
        type: Array,
        default: []
    }
}, {
    collection: 'jobs'
});

module.exports = mongoose.model('Job', jobModel);