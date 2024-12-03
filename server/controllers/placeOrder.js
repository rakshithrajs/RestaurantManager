import { orderModel } from "../models/orderModel.js";

import { CustomError } from "../utils/customError.js";

//to dsiplay the orders in all order screen
export const getOrders = async (req, res, next) => {
    try {
        const groupedOrders = await orderModel.aggregate([
            {
                //joining tables
                $lookup: {
                    from: "menumodels",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "itemDetails",
                },
            },
            {
                $lookup: {
                    from: "tablemodels",
                    localField: "tableId",
                    foreignField: "_id",
                    as: "tableDetails",
                },
            },
            {
                $unwind: "$itemDetails",
                $unwind: "$tableDetails",
            },
            {
                $group: {
                    _id: {
                        itemId: "$itemId",
                        tableId: "$tableId",
                    },
                    orderId: { $first: "$_id" },
                    count: { $sum: 1 },
                    tableNo: { $first: "$tableDetails.tableNo" },
                    itemName: { $first: "$itemDetails.item" },
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    price: { $first: "$itemDetails.price" },
                },
            },
            {
                $sort: {
                    itemName: 1,
                    createdAt: 1,
                },
            },
        ]);
        res.status(200).json(groupedOrders);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//get details on one particular order
export const getOneOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await orderModel
            .find({ _id: id })
            .populate("itemId", "item")
            .populate("tableId", "tableNo");
        res.status(200).json(order);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//make an order
export const addOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const newOrder = new orderModel(order);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//delete an order
export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//delete all orders
export const deleteAll = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteOrders = await orderModel.deleteMany({
            tableId: { _id: id },
        });
        res.status(200).json(deleteOrders);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//update an order
export const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = req.body;
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(id, order, {
            new: true,
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
