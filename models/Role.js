const {Schema, model} = require('mongoose')

const Role = new Schema({
    name: {type: String, unique: true, default: "User"},
})

module.exports = model('Role', Role)