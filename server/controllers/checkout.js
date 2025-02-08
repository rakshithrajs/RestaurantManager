import mongoose from "mongoose";

import { orderCount } from "../models/orderWithCount.js";
import { orderHistoryModel } from "../models/orderHistory.js";

import { CustomError } from "../utils/customError.js";

// to generate bill
export const getTableBill = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tableId = new mongoose.Types.ObjectId(id); // to make the string id as object id so that we can match in the aggreagation
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
                // we are choosing what columsn should be there at the end
                $project: {
                    _id: 1,
                    tableId: "$tableId",
                    customerName: "$tables.customerName",
                    customerPhone: "$tables.customerPhone",
                    createdAt: "$tables.createdAt",
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
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//for storing the order history of all tables
export const postOrderHistory = async (req, res, next) => {
    try {
        const order = req.body;
        const orderHistory = await orderHistoryModel.create({
            ...order,
            user_id: req.user[0]._id,
        });
        res.status(200).json(orderHistory);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
