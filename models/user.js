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
    products_stored: {
        type: Schema.Types.ObjectId,
        ref: 'PublishedProduct',
    },
    product_cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    orders:{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }
})

module.exports = mongoose.model('User', userSchema);