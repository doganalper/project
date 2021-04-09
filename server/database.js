const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'project';

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('-----Database connection successful-----')
            })
            .catch(err => {
                console.log("Error log:");
                console.log(err);
                console.error('Database connection error')
            })
    }
}

module.exports = new Database();