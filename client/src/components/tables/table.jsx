import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api.jsx";

import rupee from "../../utils/currencyFormatter.jsx";
import { capitalize } from "../../utils/capitalize.jsx";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { useStore } from "../../contexts/storeContext.jsx";

const TableDetailsModal = ({ isOpen, setIsOpen, table }) => {
    const { user } = useAuthContext(); // Auth token

    const { dispatch } = useStore();

    const [orders, setOrders] = useState([]); // Orders for the table

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(
                    response.data.filter((o) => o._id.tableId === table._id)
                );
            } catch (error) {
                console.error("Error fetching orders:", error.message);
            }
        };

        if (isOpen) {
            fetchOrders();
        }
    }, [isOpen, table, user]);

    const deleteTable = async () => {
        try {
            const response = await api.delete(`/tables/${table._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch({ type: "DELETE_TABLE", payload: table._id });
            setIsOpen(false);
        } catch (error) {
            console.error("Error deleting table:", error.message);
        }
    };

    const handleCheckout = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl mx-auto">
                {/* Header */}
                <h2 className="mb-6 text-3xl font-bold text-gray-800 text-center border-b pb-4">
                    Table Details
                </h2>

                {/* Table Info */}
                <div className="mb-6">
                    <p className="text-lg">
                        <strong>Table No:</strong> {table.tableNo}
                    </p>
                    <p className="text-lg">
                        <strong>Customer Name:</strong> {table.customerName}
                    </p>
                </div>

                {/* Order Details */}
                <section className="mb-6">
                    <legend className="text-xl font-bold text-gray-700 mb-4">
                        Orders
                    </legend>
                    <table className="w-full text-sm text-left overflow-auto border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-2 md:px-4 py-2">Item</th>
                                <th className="px-2 md:px-4 py-2">Quantity</th>
                                <th className="px-2 md:px-4 py-2">Price</th>
                                <th className="px-2 md:px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length ? (
                                orders.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-2 md:px-4 py-2">
                                            {item.itemName}
                                        </td>
                                        <td className="px-2 md:px-4 py-2">
                                            {item.count}
                                        </td>
                                        <td className="px-2 md:px-4 py-2">
                                            {rupee.format(item.price)}
                                        </td>
                                        <td className="px-2 md:px-4 py-2">
                                            {capitalize(item.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center text-gray-500 py-4"
                                    >
                                        No orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* Buttons */}
                <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-end md:items-center md:space-x-4">
                    {/* add a delete button */}
                    <button
                        className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-700 transition duration-150"
                        onClick={() => deleteTable()}
                    >
                        Delete Table
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition duration-150"
                    >
                        Cancel
                    </button>
                    <button className=" px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-150">
                        <Link to={`/orders/${table._id}`}>Place Order</Link>
                    </button>

                    <button
                        onClick={handleCheckout}
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-150"
                    >
                        <Link to={`/checkout/${table._id}`}>Checkout</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableDetailsModal;
