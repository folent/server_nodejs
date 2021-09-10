const {Schema, model} = require('mongoose')

const CatalogItem = new Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    price: {type: "Number", required: true},
    count: {type: "Number", required: true},
    brand: {type: String, ref: 'Brand'},
    category: {type: String, ref: 'Category'},
    image: {type: String},
    quantity: {type: Number, required: false}
})

module.exports = model('CatalogItem', CatalogItem)