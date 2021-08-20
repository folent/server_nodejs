const {Schema, model} = require('mongoose')

const Opinion = new Schema({
    text: {type: String, required: true},
    datetime: {type: Date, required: true},
    name: {type: String, required: true},
    item: {type: String, ref: 'CatalogItem'}
})

module.exports = model('Opinion', Opinion);