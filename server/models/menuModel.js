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
    veg_or_nonveg: {
        type: String,
        required: true,
        enum: ["Veg", "Non-Veg", "veg", "non-veg"],
    },
    description: {
        type: String,
        trim: true
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: "categoryModel",
        },
    ],
});

export const menuModel = new model("menuModel", menuSchema);
