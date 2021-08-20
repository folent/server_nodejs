const {Schema, model} = require('mongoose')

const Order = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    datetime: {type: Date, required: true},
    phone: {type: String, required: true},
    items: [{type: Object, ref: 'CatalogItem'}],
    delivery: {type: Object, res: 'Delivery'}
})

module.exports = model('Order', Order)