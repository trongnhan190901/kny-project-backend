const { BadRequestError } = require('../errors')
const handlePromise = require("../helpers/promise.helper")
const Contact = require('../models/anime.model')

module.exports = {
    findAll: async(req, res, next) => {
        const conditions = {}
        const name = req.query.name

        if (name) {
            conditions.name = { $regex: new RegExp(name), $options: "i" }
        }

        const [err, documents] = await handlePromise(Contact.find(conditions))

        if (err) {
            return next(new BadRequestError(500, "An Error has occurred while creating contact"))
        }

        return res.send(documents)
    },
    findOne: async(req, res, next) => {
        const conditions = {
            _id: req.params.id
        }
        console.log(conditions);
        const [err, document] = await handlePromise(Contact.findOne(conditions))

        if (err) {
            return next(new BadRequestError(500, `Error retrieving contact with id=${req.params.id}`))
        }
        if (!document) {
            return next(new BadRequestError(404, "Contact not found"))
        }

        return res.send(document)
    },
}