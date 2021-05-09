const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    jobId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    collection: 'comments'
});

module.exports = mongoose.model('Commnent', commentModel);