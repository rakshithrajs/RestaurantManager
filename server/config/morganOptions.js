import morgan from "morgan";

morgan.token("origin", (req) => {
    return req.headers.origin;
});

export const morganFormat = ":origin :method :url :status :response-time ms";
