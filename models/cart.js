const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartProducts: [
        {
            prodId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, default:1}
        },
    ]
},{versionKey:false})

module.exports = mongoose.model('Cart',cartSchema);