export class CustomError extends Error {
    constructor(message, code = 500, stack) {
        super(message);
        this.statusCode = code;
        this.isOperational = true;
        this.errorStack = stack;
        Error.captureStackTrace(this, this.constructor);
    }
}
