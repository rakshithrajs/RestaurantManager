import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, align, printf } = format;

// Console Logger Format
const ConsoleLogger = combine(
    timestamp({ format: "DD-MM-YY HH:mm:ss.SSSS" }),
    colorize(),
    align(),
    printf(
        ({ level, timestamp, message }) =>
            `${timestamp} -> ${level}: ${message}`
    )
);

// File Logger Format
const FileLogger = combine(
    align(),
    timestamp({ format: "DD-MM-YY HH:mm:ss.SSSS" }),
    printf(
        ({ level, timestamp, message }) =>
            `${timestamp} -> ${level}: ${message}`
    )
);

// File Rotaters
const GeneralFileRotater = new transports.File({
    filename: `./log/app.log`,
    maxsize: 20 * 1024 * 1024,
    maxFiles: 3,
    level: "info",
    format: FileLogger,
});

const ErrorFileRotater = new transports.File({
    filename: `./log/app-error.log`,
    maxsize: 20 * 1024 * 1024,
    maxFiles: 3,
    level: "error",
    format: FileLogger,
});

// Create Logger
export const logger = createLogger({
    transports: [
        new transports.Console({ format: ConsoleLogger }),
        GeneralFileRotater,
        ErrorFileRotater,
    ],
});
