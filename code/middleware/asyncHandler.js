const asyncHandler = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .reject(next)
module.exports = asyncHandler;