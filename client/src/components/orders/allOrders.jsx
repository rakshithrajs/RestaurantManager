import React, { useEffect, useState, useRef, useContext } from "react";
import api from "../../api/api.jsx";
import { renderState } from "../../contexts/menuContext.jsx";

const allOrders = () => {
    const [render, setRender] = useContext(renderState);
    const [orders, setOrders] = useState([]);
    const status = useRef("confirmed");
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get("/orders");
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchOrder();
    }, [render]);
    const [newOrder, setNewOrder] = useState({});
    useEffect(() => {
        console.log("new order", newOrder);
    }, [newOrder]);
    const handleChange = async (id, orderData) => {
        const updated = orders.map((o) =>
            o._id == id ? { ...o, status: orderData.status } : o
        );
        console.log(updated);
        setOrders(updated);
        try {
            setRender(render + 1);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
        if(orderData.status === "delivered" || orderData.status === "cancelled"){
            try {
                const deleteOrder = await api.delete()
            } catch (error) {
                
            }
        }
    };
    // console.log(newOrder);
    return (
        <div className="flex flex-col my-[2vw] mx-[2vw] shadow border-b border-gray-200 rounded-md">
            <table className="">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-[2vw] py-[1vw] font-medium text-gray-500 uppercase "
                        >
                            Sl No
                        </th>
                        <th
                            scope="col"
                            className="px-[2vw] py-[1vw] font-medium text-gray-500 uppercase "
                        >
                            Table No
                        </th>
                        <th
                            scope="col"
                            className="px-[2vw] py-[1vw] font-medium text-gray-500 uppercase "
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-[2vw] py-[1vw] font-medium text-gray-500 uppercase "
                        >
                            Item Name
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((o, index) => (
                        <tr key={o._id}>
                            <td className="px-[2vw] py-[1vw] flex items-center justify-center font-medium text-gray-900">
                                {index + 1}
                            </td>
                            <td className="px-[2vw] py-[1vw] text-center">
                                {o.tableId.tableNo}
                            </td>
                            <td className="px-[2vw] py-[1vw] text-center text-gray-500">
                                {o.itemId.item}
                            </td>
                            <td className="flex justify-center">
                                <span className="px-[1vw] py-[0.5vw] inline-flex text-xs font-semibold uppercase rounded-full">
                                    <select
                                        name="status"
                                        id="status"
                                        value={o.status}
                                        onChange={(event) => {
                                            status.current = event.target.value;
                                            const data = orders.find(
                                                (or) => or._id == o._id
                                            );
                                            const d = {
                                                ...data,
                                                status: event.target.value,
                                            };
                                            handleChange(o._id, d);
                                        }}
                                        className={`border-none flex justify-center items-center uppercase rounded-full cursor-pointer px-[0.6vw] py-[0.2vw]`}
                                        style={{
                                            backgroundColor:
                                                o.status === "confirmed"
                                                    ? "lightblue"
                                                    : o.status === "cancelled"
                                                    ? "lightcoral"
                                                    : o.status === "cooking"
                                                    ? "LightYellow"
                                                    : o.status === "delivered"
                                                    ? "lightgreen"
                                                    : "white",
                                            color:
                                                o.status === "confirmed"
                                                    ? "blue"
                                                    : o.status === "cancelled"
                                                    ? "darkRed"
                                                    : o.status === "cooking"
                                                    ? "Goldenrod"
                                                    : o.status === "delivered"
                                                    ? "green"
                                                    : "white",
                                        }}
                                    >
                                        <option className=" bg-white text-black" value="confirmed">
                                            confirmed
                                        </option>
                                        <option className=" bg-white text-black" value="cancelled">
                                            cancelled   
                                        </option>
                                        <option className=" bg-white text-black" value="cooking">cooking</option>
                                        <option className=" bg-white text-black" value="delivered">
                                            delivered
                                        </option>
                                    </select>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default allOrders;
