import mongoose from "mongoose";
import { orderCount } from "../models/orderWithCount.js";
import { orderHistoryModel } from "../models/orderHistory.js";

export const getTableBill = async (req, res) => {
    try {
        const { id } = req.params;
        const tableId = new mongoose.Types.ObjectId(id);
        const orders = await orderCount.aggregate([
            {
                $match: {
                    tableId: tableId,
                },
            },
            {
                $lookup: {
                    from: "menumodels",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "items",
                },
            },
            {
                $lookup: {
                    from: "tablemodels",
                    localField: "tableId",
                    foreignField: "_id",
                    as: "tables",
                },
            },
            {
                $unwind: "$items",
                $unwind: "$tables",
            },
            {
                $project: {
                    _id: 1,
                    tableId: "$tableId",
                    customerName: "$tables.customerName",
                    customerPhone: "$tables.customerPhone",
                    createdAt: "$tables.createdAt",
                    //make an object of items with _id: { $first: "$items._id" }, name: { $first: "$items.item" }, price: { $first: "$items.price" }, quantity: "$quantity",
                    items: {
                        _id: { $first: "$items._id" },
                        name: { $first: "$items.item" },
                        price: { $first: "$items.price" },
                        quantity: "$quantity",
                    },
                },
            },
            {
                $group: {
                    _id: "$tableId",
                    customerName: { $first: "$customerName" },
                    customerPhone: { $first: "$customerPhone" },
                    createdAt: { $first: "$createdAt" },
                    items: { $push: { $arrayElemAt: ["$items", 0] } },
                },
            },
        ]);
        res.status(200).json(orders);
    } catch (error) {
        res.json(error.message);
    }
};

export const postOrderHistory = async (req, res) => {
    try {
        const order = req.body;
        const orderHistory = await orderHistoryModel.create(order);
        res.status(200).json(orderHistory);
    } catch (error) {
        res.json(error.message);
    }
};
