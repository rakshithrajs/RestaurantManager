import { logger } from "../utils/logger.js";

export const errorCheck = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    logger.error(`${error}`);
    res.status(error.statusCode).json({
        status: "error",
        message: error.message || "Internal Server Error",
    });
};
