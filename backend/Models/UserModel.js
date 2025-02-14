const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/256/3135/3135768.png'
    },
    phone: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);