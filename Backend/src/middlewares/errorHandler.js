class AppError extends Error {
    constructor(message = 'Internal Server error', status = 500, data = {}) {
        super(message)
        this.status = status
        this.data = data
        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequest extends AppError {
    constructor(message = 'Invalid Data') {
        super(message, 400)
    }
}

class NotFound extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404)
    }
}

class DuplicationError extends AppError {
    constructor(message = 'Instance already exists') {
        super(message, 409)
    }
}

class UnAuthorize extends AppError {
    constructor(message = 'Access denied.', data = {}) {
        super(message, 401, data)
    }
}

function errorHandler(err, req, res, next) {
    const { status, message, ...data } = err
    return res.status(status).json({ message, ...data })
}

export { AppError, errorHandler, BadRequest, DuplicationError, NotFound, UnAuthorize }