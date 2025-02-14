const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Rate', RateSchema);