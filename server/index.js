import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import menuRoutes from "./Routes/menuRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import tableRoutes from "./Routes/tableRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/menu", menuRoutes);
app.use("/category", categoryRoutes);
app.use("/tables", tableRoutes)
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
    });
