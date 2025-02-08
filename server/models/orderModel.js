import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        tableId: {
            type: Schema.Types.ObjectId,
            ref: "tableModel",
            required: true,
        },
        itemId: {
            type: Schema.Types.ObjectId,
            ref: "menuModel",
            required: true,
        },
        status: {
            type: String,
            enum: [
                "confirmed",
                "cooking",
                "ready_to_deliver",
                "delivered",
                "cancelled",
            ],
            default: "confirmed",
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
            required: true,
        },
    },
    { timestamps: true }
);

export const orderModel = mongoose.model("orderModel", orderSchema);
