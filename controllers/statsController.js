const Order = require("../models/Order")

class statsController {
    async getStatsOrdersByMonth(req, res) {
        try {
            const result = [];
            const Year = new Date().getFullYear();
            for(let i = 1; i <= 12; i++) {
                const orders = await Order.aggregate(
                    [
                        {
                            $project:
                                {
                                    year: { $year: "$datetime" },
                                    month: { $month: "$datetime" }
                                }
                        },
                        { "$match": { "month": i } },
                        { "$match": { "year": Year }}
                    ]
                )
                result.push(orders.length)
            }


            res.status(200).json(result)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new statsController()