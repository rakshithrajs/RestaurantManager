export class CustomError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.statusCode = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
