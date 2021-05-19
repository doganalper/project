const mongoose = require('mongoose');

const requestCommentModel = new mongoose.Schema({
    requestId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['guest', 'user'],
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'requestComments'
});

module.exports = mongoose.model('RequestComment', requestCommentModel);