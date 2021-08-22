const Order = require("../models/Order")

class orderController {
    async getOrders(req, res) {
        try {
            const {email} = req.body
            const orders = await Order.find({email})

            res.status(200).json(orders)
        } catch (e) {
            console.log(e)
        }
    }

    async addOrder(req, res) {
        try {
            const {firstname, lastname, email, phone, datetime, items, delivery} = req.body
            const order = new Order({firstname, lastname, email, phone, datetime, items: [...items], delivery})
            await order.save()

            res.status(200).json({firstname, lastname, email, phone, datetime, items, delivery})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new orderController()