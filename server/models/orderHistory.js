import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    _id: { type: Object },
});

const historySchema = new Schema({
    createdAt: {
        type: Date, //time of entering and setting up table
    },
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    items: [itemSchema],
    total: {
        type: Number,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
});

export const orderHistoryModel = new model("orderHistoryModel", historySchema);
