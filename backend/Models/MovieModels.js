const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String, // Added a new field to store image path or URL
        required: false
    }
});

module.exports = mongoose.model('Movies', MovieSchema);
