const mongoose = require('mongoose')

const schema = mongoose.Schema({
    seasons: Number,
    episodes: String,
    link: String,
    img: String,
})

schema.method('toJSON', function() {
    const { __v, _id, ...objects } = this.toObject()
    objects.id = _id
    return objects
})

module.exports = mongoose.model('anime', schema)