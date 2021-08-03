const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product_type: {
        type: String,        
        default: "others"
    },
    product_image: {
        type: String,        
        default: 'https://pbs.twimg.com/profile_images/1412404230955180052/sfG5Q2YD_400x400.jpg'
    },
    product_tags: {
        type: [],
        default: ['product']
    }
})

module.exports = mongoose.model('Product', productSchema);