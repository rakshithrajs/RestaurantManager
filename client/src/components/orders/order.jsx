import { useContext, useEffect, useState } from "react";
import api from "../../api/api.jsx";
import { renderState } from "../../contexts/menuContext.jsx";
import { MdDeleteOutline } from "react-icons/md";

const order = ({ id }) => {
    const [render, setRender] = useContext(renderState);
    const [order, setOrder] = useState();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get("/orders");
                setOrder(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchOrder();
    }, [render]);
    const deleteOrder = async (id) => {
        try {
            const response = await api.delete(`/orders/${id}`);
            console.log(response.data);
            setRender(render + 1);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <section className="py-[2vw] mx-[2vw]">
            <h1 className="font-bold text-2xl mb-8 text-center text-black">
                Order
            </h1>
            <table className="w-[40vm]">
                <thead>
                    <tr className=" py-6 ">
                        <th className=" px-[3vw] text-md text-gray-500">
                            Product
                        </th>
                        <th className=" px-[3vw] text-md text-gray-500">
                            Quantity
                        </th>
                        <th className=" px-[3vw] text-md text-gray-500">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order ? (
                        order
                            .filter((or) => or._id.tableId === id)
                            .map((o) => (
                                <tr
                                    key={o.orderId}
                                    className=" border-t border-gray-200"
                                >
                                    <td className=" py-[1vw] text-center text-md">
                                        {o._id.itemId ? o.itemName : ""}
                                    </td>
                                    <td className=" py-[1vw] text-center text-md">{o.count}</td>
                                    <td className=" px-[3vw]">
                                        <button
                                            onClick={() => {
                                                deleteOrder(o.orderId);
                                            }}
                                        >
                                            <MdDeleteOutline className="m-auto ml-[1vw] size-[2vw] text-red-700" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr className=" border-t border-gray-200"></tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default order;
