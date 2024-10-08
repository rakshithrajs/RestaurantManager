import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import menuRoutes from "./Routes/menuRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import tableRoutes from "./Routes/tableRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import checkoutRoutes from "./Routes/checkoutRoutes.js";
import salesRoutes from "./Routes/salesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
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
        console.log("mongodb connected");
        app.listen(PORT, () =>
            console.log(
                `Example app listening on port ${PORT}! http://localhost:3000`
            )
        );
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
