const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        trim: true,
    },
    publish_year: {
        type: Number,
        min: 1,
        max: 9999
    },
    edition: {
        type: Number,
        min: 1,
        max: 999
    },
    filename: {
        type: String,
    }
});

module.exports = mongoose.model('Book', BookSchema);