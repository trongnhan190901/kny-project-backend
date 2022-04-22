const { BadRequestError } = require('../errors')
const handlePromise = require("../helpers/promise.helper")
const Contact = require('../models/anime.model')

module.exports = {
    create: async(req, res, next) => {
        if (!req.body.name) {
            return next(new BadRequestError(400, "Name can not be empty"));
        }

        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            favorite: String(req.body.favorite).toLowerCase() === "true",
        })

        const [err, document] = await handlePromise(contact.save())

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

        const [err, documents] = await handlePromise(Contact.find(conditions))

        if (err) {
            return next(new BadRequestError(500, "An Error has occurred while creating contact"))
        }

        return res.send(documents)
    },
    findAllFavorite: async(req, res, next) => {
        const [err, documents] = await handlePromise(
            Contact.find({ favorite: true })
        )

        if (err) {
            return next(new BadRequestError(500, "An error occurred while retrieving favorite contacts"))
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
    update: async(req, res, next) => {
        if (!req.body) {
            return next(new BadRequestError(400,
                "Data to update can not be empty"))
        }

        const conditions = {
            _id: req.params.id,
        }

        const [err, document] = await handlePromise(
            Contact.findOneAndUpdate(conditions, req.body, {
                new: true
            })
        )
        if (err) {
            return next(new BadRequestError(500,
                `Error updating contact with id ${req.params.id}`))
        }

        if (!document) {
            return next(new BadRequestError(404, "Contact not found"))
        }

        return res.send({ message: 'Contact was update successfully' })
    },
    delete: async(req, res, next) => {
        const conditions = {
            _id: req.params.id,
        }
        const [err, document] = await handlePromise(
            Contact.findOneAndDelete(conditions)
        )

        if (err) {
            return next(new BadRequestError(404, "Contact not found"))
        }

        return res.send({ message: 'Contact was delete successfully' })
    },
    deleteAll: async(req, res, next) => {
        const [err, data] = await handlePromise(
            Contact.deleteMany({})
        )
        if (err) {
            return next(new BadRequestError(500, "An error occurred while removing all contacts"))
        }

        return res.send({ message: `${data.deletedCount} contact were deleted successfully` })
    },

}