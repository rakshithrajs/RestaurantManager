import { orderHistoryModel } from "../models/orderHistory.js";

export const getSales = async (req, res) => {
    try {
        const sales = await orderHistoryModel.aggregate([
            {
                $project: {
                    _id: "$_id",
                    createdAt: "$createdAt",
                    total: "$total",
                    itemName: "$items.name",
                },
            },
        ]);
        res.status(200).json(sales);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getDish = async (req, res) => {
    try {
        const dish = await orderHistoryModel.aggregate([
            {
                $unwind: "$items",
            },
            {
                $group: {
                    _id: { itemName: "$items.name", date: "$createdAt" },
                    count: { $sum: "$items.quantity" },
                },
            },
            {
                $project: {
                    createdAt: "$_id.date",
                    itemName: "$_id.itemName",
                    count: "$count",
                    _id: 0,
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);
        res.status(200).json(dish);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
