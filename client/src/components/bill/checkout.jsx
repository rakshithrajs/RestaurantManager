import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";

import api from "../../api/api.jsx";

import { capitalize } from "../../utils/capitalize.jsx";
import rupee from "../../utils/currencyFormatter.jsx";

import PaymentDone from "./paymentDone.jsx";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const Checkout = () => {
    //for auth token
    const { user } = useAuthContext();
    
    //for navigation
    const navigate = useNavigate();
    
    //for bill generation
    const [data, setData] = useState();
    const [orderData, setOrderData] = useState();
    const { id } = useParams();
    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get(`/checkout/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setData(response.data[0]);
            } catch (error) {
                console.error("Error fetching checkout details:", error);
            }
        };
        if (user) getDetails();
    }, [id, user]);

    useEffect(() => {
        if (data) {
            const total = data.items.reduce(
                (acc, item) => acc + item.price * item.quantity * 1.05,
                0
            );
            setOrderData({ ...data, total });
        }
    }, [data]);

    const handlePayment = async () => {
        try {
            setVisible(true);
            await api.post("/checkout/history", orderData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            await api.delete(`/tables/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            await api.delete(`/orders/all/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            setTimeout(() => {
                navigate("/tables");
            }, 1000);
        } catch (error) {
            console.error("Payment processing error:", error);
        }
    };

    return (
        <>
            {visible && <PaymentDone setVisible={setVisible} />}
            <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-12 my-6">
                <div className="bg-gradient-to-tl from-gray-100 from-80% via-gray-400 via-50% to-gray-100 to-10% p-8 sm:p-12 rounded-xl shadow-lg">
                    {/* Invoice Header */}
                    <div>
                        <h2 className="text-3xl font-bold">Invoice</h2>
                        <p className="mt-2 text-lg opacity-80">
                            {data && data._id}
                        </p>
                    </div>

                    {/* Invoice Details */}
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Billed To:
                            </h3>
                            <p className="mt-1 text-lg">
                                {data && capitalize(data.customerName)}
                            </p>
                            <h3 className="mt-4 text-lg font-semibold">
                                Phone No:
                            </h3>
                            <p className="mt-1 text-lg">
                                {data && data.customerPhone}
                            </p>
                        </div>
                        <div className="text-sm-right">
                            <h3 className="text-lg font-semibold">
                                Invoice Date:
                            </h3>
                            <p className="mt-1 text-lg">
                                {data &&
                                    moment(data.createdAt).format("DD/MM/YYYY")}
                            </p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-auto mt-8">
                        <table className="w-full border border-black">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-sm text-center font-medium uppercase border-b border-black">
                                        Item
                                    </th>
                                    <th className="py-2 px-4 text-sm text-center font-medium uppercase border-b border-black">
                                        Quantity
                                    </th>
                                    <th className="py-2 px-4 text-sm text-center font-medium uppercase border-b border-black">
                                        Rate
                                    </th>
                                    <th className="py-2 px-4 text-sm text-center font-medium uppercase border-b border-black">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.items.map((item) => (
                                        <tr
                                            key={item._id}
                                        >
                                            <td className="py-4 px-4 border-b border-b-black text-center">
                                                {item.name}
                                            </td>
                                            <td className="py-4 px-4 border-b border-b-black text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="py-4 px-4 border-b border-b-black text-center">
                                                {rupee.format(item.price)}
                                            </td>
                                            <td className="py-4 px-4 border-b border-b-black text-center">
                                                {rupee.format(
                                                    item.quantity * item.price
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Table */}
                    <div className="mt-8 text-right">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">
                                    Total:
                                </span>
                                <span className="text-lg">
                                    {data &&
                                        rupee.format(
                                            data.items.reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.quantity * item.price,
                                                0
                                            )
                                        )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">
                                    Tax (5%):
                                </span>
                                <span className="text-lg">
                                    {data &&
                                        rupee.format(
                                            data.items.reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.quantity *
                                                        item.price *
                                                        0.05,
                                                0
                                            )
                                        )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold">
                                    Total Amount:
                                </span>
                                <span className="text-lg font-bold">
                                    {data &&
                                        rupee.format(
                                            data.items.reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.quantity *
                                                        item.price *
                                                        1.05,
                                                0
                                            )
                                        )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center text-lg font-semibold">
                        Thank you for your business!
                    </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handlePayment}
                        className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
