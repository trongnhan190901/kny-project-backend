const app = require('./app')
const config = require('./app/config')
const mongoose = require('mongoose')
const MongoDB = require("./app/utils/mongodb.util")

MongoDB.connect(config.db.uri)
mongoose.connect(config.db.uri)
    .then(() => { console.log("Connected to the database")})
    .catch(err => {
        console.log("Cannot connected to the database", err)
        process.exit();
    })

const PORT = config.app.port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})