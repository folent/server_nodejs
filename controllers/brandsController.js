const Brand = require("../models/Order")

class brandsController {
    async getBrands(req, res) {
        try {
            const brands = await Brand.find();

            res.status(200).json(brands)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new brandsController()