const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    user_type: {
        type: String,        
        default: 'customer'
    }
})

module.exports = mongoose.model('User', userSchema);