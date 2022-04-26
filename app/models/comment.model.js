const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    comment: String
},{timestamps: true} )

schema.method('toJSON', function() {
    const { __v, _id, ...objects } = this.toObject()
    objects.id = _id
    return objects
})

module.exports = mongoose.model('comment', schema)