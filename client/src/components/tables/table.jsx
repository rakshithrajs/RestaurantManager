import api from "../../api/api.jsx";
import rupee from "../../utils/currencyFormatter.jsx";
import { capitalize } from "../../utils/capitalize.jsx";
import { useContext, useEffect, useState } from "react";
import { renderState } from "../../contexts/menuContext.jsx";
import { Link } from "react-router-dom";

const table = ({ table, isOpen, setIsOpen }) => {
    const [render, setRender] = useContext(renderState);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (table._id) {
                    const orders = await api.get(`/orders/table/${table._id}`);
                    setTableData(orders.data);
                    console.log(orders.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchOrders();
    }, [isOpen]);
    const handleCheckout = async () => {
        try {
            const response = await api.delete(`/tables/${table._id}`);
            const res = await api.delete(`/orders/all/${table._id}`);
            console.log(response.data);
            console.log(res.data);
            setIsOpen(!isOpen);
            setRender(render + 1);
        } catch (error) {
            console.log(error.message);
        }
    };
    if (!isOpen) return null;
    return (
        <div className=" fixed inset-0 bg-teal-100 bg-opacity-60 backdrop-blur-md flex justify-center items-center">
            <div className="flex flex-col items-center size-[65.1vw] space-y-[1vw] bg-teal-200 bg-opacity-50 rounded-full py-[15vw]">
                <h1 className="text-[1.5vw]">Table No: {table.tableNo}</h1>
                <h1 className="text-[1.5vw]">
                    Customer Name: {table.customerName}
                </h1>
                <section>
                    <legend className="text-[1.5vw] w-full text-center font-bold">Order Details</legend>
                    <table className=" w-full text-sm text-left rtl:text-right ">
                        <thead className="text-xs uppercase ">
                            <tr className="border-b border-neutral-950">
                                <th scope="col" className="px-6 py-3">
                                    Item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr
                                    key={item._id}
                                    scope="row"
                                    className="px-6 py-4 font-medium border-b border-neutral-950 text-gray-900 whitespace-nowrap"
                                >
                                    <td className="px-6 py-4">
                                        {capitalize(item.itemId.item)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rupee.format(item.itemId.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {capitalize(item.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="flex space-x-2">
                    <button
                        type="button"
                        className=" hover:bg-teal-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className=" hover:bg-teal-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                    <Link to={`/orders/${table._id}`}>
                        <button className=" hover:bg-teal-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                            Place Order
                        </button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default table;
