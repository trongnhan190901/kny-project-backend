const express = require('express')
const animes = require('../controllers/anime.controller')

module.exports = app => {
    const router = express.Router()

    router.get('/', animes.findAll)

    router.get('/:id', animes.findOne)

    app.use('/api/animes', router)
}