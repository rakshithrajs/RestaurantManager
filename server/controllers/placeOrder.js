import { orderModel } from "../models/orderModel.js";

export const getOrders = async (req, res) => {
    try {
        const groupedOrders = await orderModel.aggregate([
            {
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
                    orderId: {$first: "$_id"},
                    count: { $sum: 1 },
                    tableNo: { $first: "$tableDetails.tableNo" },
                    itemName: { $first: "$itemDetails.item" },
                    status: {$first: "$status"},
                },
            },
        ]);
        res.status(200).json(groupedOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOneOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel
            .find({ _id: id })
            .populate("itemId", "item")
            .populate("tableId", "tableNo");
        res.status(200).json(order);
    } catch (error) {
        res.json({ message: error.message });
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

export const getOrderByTable = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await orderModel
            .find({ tableId: id })
            .populate({
                path: "itemId",
                select: "item price",
            })
            .populate("tableId", "tableNo");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

export const deleteAll = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteOrders = await orderModel.deleteMany({
            tableId: { _id: id },
        });
        res.status(200).json(deleteOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const order = req.body;
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(id, order, {
            new: true,
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
