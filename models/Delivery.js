const {Schema, model} = require('mongoose')

const Order = new Schema({
    pickup: {type: Boolean, required: true, default: false},
    courier: {type: Boolean, required: true, default: false },
    city: {type: String},
    street: {type: String},
    house: {type: String},
    flat: {type: String},
    entrance: {type: String},
    floor: {type: String}
})

module.exports = model('Order', Order)