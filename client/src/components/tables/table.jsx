import api from "../../api/api.jsx";
import { useContext, useEffect, useState } from "react";
import { renderState } from "../../contexts/menuContext.jsx";
import PlaceOrder from "../orders/placeOrder.jsx";
import { Link } from "react-router-dom";

const table = ({ table, isOpen, setIsOpen }) => {
    const [render, setRender] = useContext(renderState);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const orders = await api.get("/orders");
                setOrder(orders.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getOrders();
    }, []);
    const handleCheckout = async () => {
        try {
            const response = await api.delete(`/tables/${table._id}`);
            console.log(response.data);
            setIsOpen(!isOpen);
            setRender(render + 1);
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(order)
    if (!isOpen) return null;
    return (
        <div className=" fixed inset-0 bg-teal-100 bg-opacity-60 backdrop-blur-md flex justify-center items-center">
            <div className="flex flex-col items-center size-[65.1vw] space-y-[1vw] bg-teal-200 bg-opacity-50 rounded-full pt-[10vw]">
                <h1 className="text-[1.5vw]">Table No: {table.tableNo}</h1>
                <h1 className="text-[1.5vw]">
                    Customer Name: {table.customerName}
                </h1>
                <p className="text-[3vw] font-semibold">Order Details</p>
                <table className=" table-auto border-separate">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((order) => {
                            <tr key={order._id} className="text-[1.5vw]">
                                <td>{order.itemId.item}</td>
                                <td>{order.status}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
                <Link to={`/orders/${table._id}`}>
                    <button>Place Order</button>
                </Link>
            </div>
        </div>
    );
};

export default table;
