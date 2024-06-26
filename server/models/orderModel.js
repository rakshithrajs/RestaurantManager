import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    tableId: {
        type: Schema.Types.ObjectId,
        ref: "tableModel",
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "menuModel",
    },
    quantity: {
        type: Number,
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
        default: "cocnfirmed",
    },
    notes: {
        type: String,
    },
});

export const orderModel = mongoose.model("orderModel", orderSchema);

async function printItemName(orderId) {
    const order = await orderModel.findById(orderId).populate("itemId");
    return order.itemId.item;
}

async function printTableNumber(orderId) {
    const order = await orderModel.findById(orderId).populate("tableId");
    return order.tableId.tableNo;
}
