const express = require("express");
const cors = require("cors");
const Comment = require('./app/routes/comment.routes')
const setupContactRoutes = require('./app/routes/anime.routes')
const authRouter = require("./app/routes/auth.routes")
const { BadRequestError, errorHandler } = require("./app/errors")


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." })
})

setupContactRoutes(app)
Comment(app)

app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"))
})

app.use((err, req, res, next) => {
    errorHandler.handleError(err, res)
})


module.exports = app;