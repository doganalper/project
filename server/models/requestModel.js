const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date || null,
        default: null,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [String],
        default: []
    },
    content: {
        type: String
    }
}, {
    collection: 'requests'
});

module.exports = mongoose.model('Request', requestSchema);