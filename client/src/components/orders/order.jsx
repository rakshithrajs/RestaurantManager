import { useContext, useEffect, useState } from "react";
import del from "/delete.png";
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
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order ? (
                        order
                            .filter((or) => or.tableId._id === id)
                            .map((o) => (
                                <tr
                                    key={o._id}
                                    className=" border-t border-gray-200"
                                >
                                    <td className=" py-[1vw] text-center text-md">
                                        {o.itemId ? o.itemId.item : ""}
                                    </td>
                                    <td className=" px-[3vw]">
                                        <button
                                            onClick={() => {
                                                deleteOrder(o._id);
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
                <tfoot className="flex items-center flex-col justify-center mt-8">
                    <tr>
                        <td
                            colSpan={2}
                            className="flex justify-center items-center"
                        >
                            <button className=" rounded-sm p-[0.6vw] gap-1 text-center justify-center items-center bg-indigo-600 text-white flex transition-all duration-500 hover:bg-indigo-700">
                                <p>Place Order</p>
                                &gt;
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
    );
};

export default order;
