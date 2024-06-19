import { Decimal128 } from "mongodb";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const menuSchema = new Schema({
    item: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true,
    },
    veg_or_nonveg: {
        type: String,
        required: true,
        enum: ["Veg", "Non-Veg", "veg", "non-veg"],
    },
    description: {
        type: String,
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: "categoryModel",
        },
    ],
});

export const menuModel = new model('menuModel', menuSchema);
