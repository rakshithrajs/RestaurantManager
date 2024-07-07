import React, { useEffect, useState } from "react";
import api from "../../api/api.jsx";
import { useParams } from "react-router";
import { capitalize } from "../../utils/capitalize.jsx";
import moment from "moment";
import rupee from "../../utils/currencyFormatter.jsx";
import PaymentDone from "./paymentDone.jsx";

const checkout = () => {
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get(`/checkout/${id}`);
                setData(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getDetails();
    }, []);
    const handlePayment = async () => {
        try {
            setVisible(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {visible && <PaymentDone setVisible={setVisible} />}
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 my-4 sm:my-10 sm:w-11/12 lg:w-3/4 mx-auto">
                <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                            Bill #
                        </h2>
                        <span className="mt-1 block text-gray-500">
                            {data && data._id}
                        </span>
                    </div>
                    <div className="mt-8 grid sm:grid-cols-2 gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Billed to:
                            </h3>
                            <span className=" block text-gray-500">
                                {data && capitalize(data.customerName)}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Phone No
                            </h3>
                            <span className=" block text-gray-500">
                                {data && data.customerPhone}
                            </span>
                        </div>
                        <div className="text-end grid-cols-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Invoice date:
                            </h3>
                            <span className=" block text-gray-500">
                                {data &&
                                    moment(data.createdAt).format("DD/MM/YYYY")}
                            </span>
                        </div>
                    </div>
                    <table className="border border-gray-200 mt-6  rounded-lg w-full">
                        <thead>
                            <tr>
                                <th className=" text-start text-gray-500 uppercase">
                                    Item
                                </th>
                                <th className=" text-start text-gray-500 uppercase">
                                    Qty
                                </th>
                                <th className=" text-start text-gray-500 uppercase">
                                    Rate
                                </th>
                                <th className=" text-start text-gray-500 uppercase">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.items.map((i) => (
                                    <tr key={i._id}>
                                        <td className="col-span-full sm:col-span-2">
                                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                                Item
                                            </h5>
                                            <p className="font-medium text-gray-800">
                                                {i.name}
                                            </p>
                                        </td>
                                        <td>
                                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                                Qty
                                            </h5>
                                            <p className="text-gray-800">
                                                {i.quantity}
                                            </p>
                                        </td>
                                        <td>
                                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                                Rate
                                            </h5>
                                            <p className="text-gray-800">
                                                {rupee.format(i.price)}
                                            </p>
                                        </td>
                                        <td>
                                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                                Amount
                                            </h5>
                                            <p className=" text-gray-800">
                                                {rupee.format(
                                                    i.quantity * i.price
                                                )}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <table className="mt-8 mr-[5vw]">
                        <tbody>
                            <tr>
                                <th className=" text-start font-semibold text-gray-800">
                                    Total:
                                </th>
                                <td className="px-[2vw] text-gray-500">
                                    {data &&
                                        rupee.format(
                                            data.items.reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.quantity * item.price,
                                                0
                                            )
                                        )}
                                </td>
                            </tr>
                            <tr>
                                <th className=" text-start font-semibold text-gray-800">
                                    Tax:
                                </th>
                                <td className="px-[2vw] text-gray-500">
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
                                </td>
                            </tr>
                            <tr>
                                <th className=" text-start font-semibold text-gray-800">
                                    Total Amount to be Paid:
                                </th>
                                <td className="px-[2vw] text-gray-500">
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
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-8 sm:mt-12 text-lg font-semibold text-gray-800">
                        Thank you!
                    </div>
                </div>
            </div>
            <button
                onClick={handlePayment}
                className="ml-[45%] mb-[2vw] py-2 px-4 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Proceed to Payment
            </button>
        </>
    );
};

export default checkout;
