const { BadRequestError } = require('../errors')
const handlePromise = require("../helpers/promise.helper")
const Commment = require('../models/comment.model')

module.exports = {
    create: async(req, res, next) => {
        if (!req.body.name) {
            return next(new BadRequestError(400, "Name can not be empty"));
        }

        const comment = new Commment({
            name: req.body.name,
            comment: req.body.comment
        })

        const [err, document] = await handlePromise(comment.save())

        if (err) {
            return next(new BadRequestError(500, "An Error has occurred while creating contact"))
        }

        return res.send(document)
    },
    findAll: async(req, res, next) => {
        const conditions = {}
        const name = req.query.name

        if (name) {
            conditions.name = { $regex: new RegExp(name), $options: "i" }
        }

        const [err, documents] = await handlePromise(Commment.find(conditions))

        if (err) {
            return next(new BadRequestError(500, "An Error has occurred while creating contact"))
        }

        return res.send(documents)
    }
}