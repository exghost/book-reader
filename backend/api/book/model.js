const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
    },
    filename: {
        type: String,
    }
});

module.exports = mongoose.model('Book', BookSchema);