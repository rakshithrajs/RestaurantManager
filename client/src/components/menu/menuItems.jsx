import React, { useContext, useEffect, useState } from "react";
import edit from "/edit.png";
import rupee from "../../utils/currencyFormatter.jsx";
import api from "../../api/api.jsx";
import { capitalize } from "../../utils/capitalize.jsx";
import available from "/available.png";
import notavailable from "/notavailable.png";
import deleteImg from "/delete.png";
import EditItem from "./editItem.jsx";
import plus from "/plus.png";
import { renderState } from "../../contexts/menuContext.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const menuItems = ({ table, set }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const [editForm, setEditForm] = useState(false);
    const [edited, setEdited] = useState({
        item: "",
        price: 0.0,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const [order, setOrder] = useState({
        itemId: "",
        tableId: "",
    });
    const [items, setItems] = useState([]);
    const [render, setRender] = useContext(renderState);
    const [idi, setId] = useState(0);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/category", {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });
                setCategory(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const response = await api.get("/menu", {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (user) {
            getItems();
        }
    }, [render, category]);
    useEffect(() => {
        const addOrders = async () => {
            try {
                const response = await api.post("/orders", order, {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });
                console.log(order);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
            setRender(render + 1);
        };
        if (order.itemId !== "") addOrders();
    }, [order]);
    const tobeEdited = (id) => {
        items.find((i) => {
            if (i._id == id) {
                setEdited(i);
            }
        });
    };
    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/menu/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
        setRender(render + 1);
    };
    const handleDeleteCategory = async (id) => {
        try {
            const response = await api.delete(`/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            });
            const res = await api.delete(`/menu/all/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            });
            setRender(render + 1);
        } catch (error) {
            console.log(error.message);
        }
    };
    let search;
    if (set) {
        search = items.filter((o) => o.item.toLowerCase().indexOf(set) > -1);
    } else {
        search = items;
    }
    if (loading) {
        return <div>Loading </div>;
    }
    if (!table) {
        return (
            <>
                <EditItem
                    isVisible={editForm}
                    setIsVisible={setEditForm}
                    id={idi}
                    editItem={edited}
                    category={category}
                />
                <table className=" w-full">
                    {category.map((i, index) => (
                        <React.Fragment key={index}>
                            <thead key={i._id}>
                                <tr>
                                    <th className="px-4 text-2xl" colSpan={6}>
                                        <div className=" flex justify-center items-center gap-[2vw] cursor-pointer">
                                            {i.name}
                                            <RiDeleteBin6Line
                                                onClick={() => {
                                                    handleDeleteCategory(i._id);
                                                }}
                                            />
                                        </div>
                                    </th>
                                </tr>
                                <tr className="text-[1.5vw] rounded-md transition-all duration-100">
                                    <th className="px-4">No.</th>
                                    <th className=" w-fit">Name</th>
                                    <th>Price</th>
                                    <th>V/N-V</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search
                                    .filter((l) => l.category === i._id)
                                    .map((j, ind) => (
                                        <tr
                                            key={j._id}
                                            className="text-[1.5vw] rounded-md transition-all duration-100 hover:bg-orange-400 hover:rounded-md"
                                        >
                                            <td className=" text-center">
                                                {ind + 1}
                                            </td>
                                            <td className=" flex flex-col justify-center font-semibold w-fit">
                                                {capitalize(j.item)}
                                                <span className="font-thin text-[1.3vw]">
                                                    {j.description}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {rupee.format(j.price)}
                                            </td>
                                            <td>
                                                {j.veg_or_nonveg === "veg" ? (
                                                    <>
                                                        <img
                                                            src={available}
                                                            alt="Available"
                                                            className="m-auto h-8 w-8"
                                                        />
                                                    </>
                                                ) : (
                                                    <img
                                                        src={notavailable}
                                                        alt="Not Available"
                                                        className="m-auto h-8 w-8"
                                                    />
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => {
                                                        setEditForm(true);
                                                        setId(j._id);
                                                        tobeEdited(j._id);
                                                    }}
                                                >
                                                    <img
                                                        src={edit}
                                                        alt="edit"
                                                        className="h-8 w-8"
                                                    />
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => {
                                                        handleDelete(j._id);
                                                    }}
                                                >
                                                    <img
                                                        src={deleteImg}
                                                        alt="delete"
                                                        className=" h-8 w-8"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </React.Fragment>
                    ))}
                </table>
            </>
        );
    } else {
        let filtered;
        if (table.veg_or_nonveg === "both") {
            filtered = search;
        } else {
            filtered = search.filter(
                (l) => l.veg_or_nonveg === table.veg_or_nonveg
            );
        }
        return (
            <>
                <table className=" w-full">
                    {category.map((i, index) => (
                        <React.Fragment key={index}>
                            <thead key={i._id}>
                                <tr>
                                    <th className="px-4 text-2xl" colSpan={5}>
                                        {i.name}
                                    </th>
                                </tr>
                                <tr className="text-[1.5vw] rounded-md transition-all duration-100">
                                    <th className="px-4">No.</th>
                                    <th className=" w-fit">Name</th>
                                    <th>Price</th>
                                    <th>V/N-V</th>
                                    <th>Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered
                                    .filter((j) => j.category === i._id)
                                    .map((j, ind) => (
                                        <tr
                                            key={j._id}
                                            className="text-[1.5vw] rounded-md transition-all duration-100 hover:bg-orange-400 hover:rounded-md"
                                        >
                                            <td className=" text-center">
                                                {ind + 1}
                                            </td>
                                            <td className=" flex flex-col justify-center font-semibold w-fit">
                                                {capitalize(j.item)}
                                                <span className="font-thin text-[1.3vw]">
                                                    {j.description}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {rupee.format(j.price)}
                                            </td>
                                            <td>
                                                {j.veg_or_nonveg === "veg" ? (
                                                    <>
                                                        <img
                                                            src={available}
                                                            alt="Available"
                                                            className="m-auto h-8 w-8"
                                                        />
                                                    </>
                                                ) : (
                                                    <img
                                                        src={notavailable}
                                                        alt="Not Available"
                                                        className="m-auto h-8 w-8"
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        const newOrder = {
                                                            itemId: j._id,
                                                            tableId: table._id,
                                                        };
                                                        setOrder(newOrder);
                                                    }}
                                                    className=" m-auto ml-[1vw] size-[2vw]"
                                                >
                                                    <img
                                                        src={plus}
                                                        alt="Add to cart"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </React.Fragment>
                    ))}
                </table>
            </>
        );
    }
};

export default menuItems;
