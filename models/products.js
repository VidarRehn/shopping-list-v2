const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: String,
    inShoppingList: Boolean
})

const Products = mongoose.model('Products', productsSchema)
module.exports = Products