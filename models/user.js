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
    },
    products_added: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ]
})

module.exports = mongoose.model('User', userSchema);