const Opinion = require("../models/Opinion")

class opinionController {
    async getOpinions(req, res) {
        try {
            const itemId = req.params.itemId
            const opinions = await Opinion.find({item: itemId})

            res.status(200).json(opinions)
        } catch (e) {
            console.log(e)
        }
    }

    async addOpinion(req, res) {
        try {
            const {text, name, item, datetime} = req.body
            console.log(text, name, item, datetime)
            const opinion = new Opinion({text, datetime, name, item})
            await opinion.save()

            res.status(200).json({text, datetime, name, item})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new opinionController()