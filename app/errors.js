class BadRequestError extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}
class ErrorHandler {
    constructor() {
        this.handleError = (err, responseStream = null) => {
            if (responseStream) {
                responseStream.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" })
            } else {
                console.log(err);
            }
        }
    }
}
module.exports = {
    BadRequestError,
    errorHandler: new ErrorHandler()
}