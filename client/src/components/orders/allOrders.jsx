import React, { useEffect, useState, useContext } from "react";

import api from "../../api/api.jsx";

import { renderState } from "../../contexts/menuContext.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const AllOrders = () => {
    //for auth token
    const { user } = useAuthContext();
    
    //for rendering
    const [render, setRender] = useContext(renderState);
    
    //for getting orders
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get("/orders", {
                    headers: { Authorization: `Bearer ${user.data.token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error.message);
            }
        };
        if (user) {
            fetchOrder();
        }
    }, [render, user]);
    const handleChange = async (id, orderData) => {
        const updated = orders.map((o) =>
            o.orderId === id ? { ...o, status: orderData.status } : o
        );
        try {
            await api.put(
                `/orders/${id}`,
                { status: orderData.status },
                {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                }
            );
            setOrders(updated);
            setRender(render + 1);
        } catch (error) {
            console.error("Error updating status:", error.message);
        }
    };

    const statusStyles = {
        confirmed: "bg-blue-100 text-blue-600",
        cancelled: "bg-red-100 text-red-600",
        cooking: "bg-yellow-100 text-yellow-600",
        delivered: "bg-green-100 text-green-600",
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div
                        key={order.orderId}
                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transform transition duration-300 hover:scale-105"
                    >
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 font-medium">
                                Order #{index + 1}
                            </span>
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    statusStyles[order.status]
                                }`}
                            >
                                {order.status.toUpperCase()}
                            </span>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Table {order.tableNo}
                            </h3>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Item:</span>{" "}
                                {order.itemName}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Quantity:</span>{" "}
                                {order.count}
                            </p>
                        </div>

                        {/* Status Selector */}
                        <div className="mt-6 flex items-center justify-between">
                            <label
                                htmlFor={`status-${order.orderId}`}
                                className="text-sm font-medium text-gray-600"
                            >
                                Status:
                            </label>
                            <select
                                id={`status-${order.orderId}`}
                                value={order.status}
                                onChange={(e) => {
                                    const updatedOrder = {
                                        ...order,
                                        status: e.target.value,
                                    };
                                    handleChange(order.orderId, updatedOrder);
                                }}
                                className={`flex items-center justify-center text-xs font-medium rounded-lg p-2 transition border border-gray-300 focus:ring-2 focus:ring-blue-300 ${
                                    statusStyles[order.status]
                                }`}
                            >
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="cooking">Cooking</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 text-lg col-span-full">
                    No orders available.
                </p>
            )}
        </div>
    );
};

export default AllOrders;
