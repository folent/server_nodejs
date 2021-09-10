const Order = require("../models/Order")
const Opinion = require("../models/Opinion");
const CatalogItem = require("../models/CatalogItem");

class orderController {
    async getOrders(req, res) {
        try {
            const {email} = req.body
            const orders = await Order.find({ email })

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

            for (const item of items) {
                const catalogItem = await CatalogItem.findOne( {_id:  item._id });
                const count = catalogItem.count - item.quantity;
                await CatalogItem.updateOne(
                      {_id:  item._id },
                    {$set: {"count": count}},
                    )
            }

            res.status(200).json({ firstname, lastname, email, phone, datetime, items, delivery })
        } catch (e) {
            console.log(e)
        }
    }

    async getOrderByID(req, res) {
        try {
            const {id} = req.params
            const order = await Order.find({_id:  id })

            res.status(200).json(...order)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new orderController()