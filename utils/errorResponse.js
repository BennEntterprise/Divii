class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.StatusCode = statusCode
    }
}

module.exports = ErrorResponse