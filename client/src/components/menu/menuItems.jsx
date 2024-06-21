import React, { useContext, useEffect, useState } from "react";
import edit from "/edit.png";
import rupee from "../../utils/currencyFormatter.jsx";
import api from "../../api/api.jsx";
import { capitalize } from "../../utils/capitalize.jsx";
import available from "/available.png";
import notavailable from "/notavailable.png";
import deleteImg from "/delete.png";
import EditItem from "./editItem.jsx";
import { categorydata, menuState } from "../../contexts/menuContext.jsx";

const menuItems = () => {
    let categoryData = useContext(categorydata);
    const [editForm, setEditForm] = useState(false);
    const [edited, setEdited] = useState({
        item: "",
        price: 0.0,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const [items, setItems] = useState([]);
    const [render, setRender] = useContext(menuState);
    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await api.get("/menu");
                setItems(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getItems();
    }, [render]);
    const tobeEdited = (id) => {
        items.find((i) => {
            if (i._id == id) {
                setEdited(i);
            }
        });
    };
    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await api.delete(`/menu/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
        setRender(render + 1);
    };
    const [idi, setId] = useState(0);
    return (
        <>
            {editForm && (
                <EditItem
                    isVisible={editForm}
                    setIsVisible={setEditForm}
                    id={idi}
                    editItem={edited}
                />
            )}
            <table className=" w-full">
                <thead>
                    <tr className="text-[1.5vw] rounded-md transition-all duration-100 hover:bg-orange-400 hover:rounded-md">
                        <th className="px-4">No.</th>
                        <th className=" w-fit">Name</th>
                        <th>Price</th>
                        <th>V/N-V</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((i, index) => (
                        <tr
                            key={i._id}
                            className="text-[1.5vw] rounded-md transition-all duration-100 hover:bg-orange-400 hover:rounded-md"
                        >
                            <td className=" text-center">{index + 1}</td>
                            <td className=" flex flex-col justify-center font-semibold w-fit">
                                {capitalize(i.item)}
                                <span className="font-thin text-[1.3vw]">
                                    {i.description}
                                </span>
                            </td>
                            <td className="text-center">
                                {rupee.format(i.price)}
                            </td>
                            <td>
                                {i.veg_or_nonveg === 'veg' ? (
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
                                        setId(i._id);
                                        tobeEdited(i._id);
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
                                        handleDelete(i._id);
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
            </table>
        </>
    );
};

export default menuItems;
