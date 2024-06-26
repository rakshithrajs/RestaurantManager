//place order controllers  get post delete update
import {orderModel} from "../models/orderModel.js"

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
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

