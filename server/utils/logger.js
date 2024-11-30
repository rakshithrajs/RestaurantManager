import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

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
const GeneralFileRotater = new DailyRotateFile({
    filename: `./log/app-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: FileLogger,
});

const ErrorFileRotater = new DailyRotateFile({
    filename: `./log/app-error-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
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
