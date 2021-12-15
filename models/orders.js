const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orders: [
        {
            prodId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
        },
    ]
},{versionKey:false})

module.exports = mongoose.model('Order',orderSchema);