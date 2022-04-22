const express = require('express')
const animes = require('../controllers/anime.controller')

module.exports = app => {
    const router = express.Router()

    router.post('/', animes.create)

    router.get('/', animes.findAll)

    router.get('/favorite', animes.findAllFavorite)

    router.get('/:id', animes.findOne)

    router.put('/:id', animes.update)

    router.delete('/:id', animes.delete)

    router.delete('/', animes.deleteAll)

    app.use('/api/animes', router)
}