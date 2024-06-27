import { orderModel } from "../models/orderModel.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("itemId", "item")
            .populate("tableId", "tableNo");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
};

export const addOrder = async (req, res) => {
    try {
        const order = req.body;
        const newOrder = new orderModel(order);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
