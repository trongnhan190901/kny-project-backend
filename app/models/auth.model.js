const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    token: String
})

schema.method('toJSON', function() {
    const { __v, _id, ...objects } = this.toObject()
    objects.id = _id
    return objects
})

module.exports = mongoose.model('user', schema)