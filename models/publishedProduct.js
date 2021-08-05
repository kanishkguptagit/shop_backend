const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publishedProductSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products_added: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = mongoose.model("PublishedProduct", publishedProductSchema);