import { CustomError } from "../utils/customError.js";

const allowedOrigins = [
    "http://localhost:5173", //only for development
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new CustomError("Not allowed by CORS", 403), false);
            next(new CustomError("Not allowed by CORS", 403));
        }
    },
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
};
