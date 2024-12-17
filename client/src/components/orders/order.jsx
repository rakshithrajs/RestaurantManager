import { useContext, useEffect, useState } from "react";

import api from "../../api/api.jsx";

import { renderState } from "../../contexts/menuContext.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

import { MdDeleteOutline } from "react-icons/md";

const Order = ({ id }) => {
    //for auth token
    const { user } = useAuthContext();

    //for rendering
    const [render, setRender] = useContext(renderState);

    //for getting the order
    const [order, setOrder] = useState();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get("/orders", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error.message);
            }
        };
        if (user) {
            fetchOrder();
        }
    }, [render, user]);
    const deleteOrder = async (orderId) => {
        try {
            await api.delete(`/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setRender(render + 1);
        } catch (error) {
            console.error("Error deleting order:", error.message);
        }
    };

    return (
        <section className="flex flex-col items-center p-6 mx-auto w-full max-w-4xl">
            <h1 className="font-bold text-2xl lg:text-3xl mb-6 text-center text-gray-800">
                Order Details
            </h1>
            <div className="overflow-x-auto w-full">
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                                Product
                            </th>
                            <th className="py-4 px-6 text-center text-gray-600 font-semibold">
                                Quantity
                            </th>
                            <th className="py-4 px-6 text-center text-gray-600 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order &&
                        order.filter((or) => or._id.tableId === id).length >
                            0 ? (
                            order
                                .filter((or) => or._id.tableId === id)
                                .map((o) => (
                                    <tr
                                        key={o.orderId}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-6 text-gray-700 truncate">
                                            {o._id.itemId ? o.itemName : "N/A"}
                                        </td>
                                        <td className="py-4 text-center text-gray-700">
                                            {o.count}
                                        </td>
                                        <td className="py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    deleteOrder(o.orderId)
                                                }
                                                className="p-2 text-red-600 rounded-full hover:bg-red-100 transition duration-200"
                                            >
                                                <MdDeleteOutline className="text-2xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="py-4 px-6 text-center text-gray-500"
                                >
                                    No orders found for this table.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Order;
