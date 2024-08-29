const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name: String,
    description: String,
    value: Number
})

module.exports = Product;