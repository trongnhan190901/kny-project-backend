const express = require('express')
const comments = require('../controllers/comment.controller')

module.exports = app => {
    const router = express.Router()

    router.get('/', comments.findAll)

    router.post('/',comments.create)

    app.use('/api/comments', router)
}