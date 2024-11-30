// express imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

// route imports
import menuRoutes from "./Routes/menuRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import tableRoutes from "./Routes/tableRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import checkoutRoutes from "./Routes/checkoutRoutes.js";
import salesRoutes from "./Routes/salesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

//utils
import { logger } from "./utils/logger.js";
import { CustomError } from "./utils/customError.js";
import { errorCheck } from "./middleware/errorCheck.js";

//environmentals variables
dotenv.config();

//creating the express app
const app = express();
const PORT = process.env.PORT || 3000;

//logging middleware
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

//functional middleware
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());

//custom middlewares
app.use(errorCheck);

//route middlewares
app.use("/menu", menuRoutes);
app.use("/category", categoryRoutes);
app.use("/tables", tableRoutes);
app.use("/orders", orderRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info("mongodb connected");
        app.listen(PORT, () =>
            logger.info(
                `Example app listening on port ${PORT}! http://localhost:3000`
            )
        );
    })
    .catch((error) => {
        const err = new CustomError(error.message, error.statusCode || 500);
        logger.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });
