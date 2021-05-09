const mongoose = require('mongoose');

const subJobModel = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'subJobs'
});

module.exports = mongoose.model('SubJob', subJobModel);