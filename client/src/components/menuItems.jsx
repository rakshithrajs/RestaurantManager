import React, { useEffect, useState } from "react";
import edit from "/edit.png";
import rupee from "../utils/currencyFormatter.jsx";
import api from "../api/api.jsx";
import { capitalize } from "../utils/capitalize.jsx";
import available from "/available.png";
import notavailable from "/notavailable.png";
import deleteImg from "/delete.png";
import EditItem from "./editItem.jsx";

const menuItems = ({ category }) => {
    const [editForm, setEditForm] = useState(false);
    const [items, setItems] = useState([]);
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
    }, []);
    const [idi, setId] = useState(0);
    return (
        <ol>
            {editForm && (
                <EditItem
                    isVisible={editForm}
                    setIsVisible={setEditForm}
                    category={category}
                    id={idi}
                />
            )}
            {items.map((i, index) => (
                <li
                    key={i._id}
                    className="grid grid-cols-6 text-[1.5vw] p-3 transition-all duration-100 hover:bg-orange-400 rounded-md"
                >
                    {index + 1}
                    <p className=" flex flex-col justify-center font-semibold">
                        {capitalize(i.item)}
                        <span className="font-thin text-[1.3vw]">
                            {i.description}
                        </span>
                    </p>
                    <span>{rupee.format(i.price)}</span>
                    <span>
                        {i.availability ? (
                            <img
                                src={available}
                                alt="Available"
                                className=" h-8 w-8"
                            />
                        ) : (
                            <img
                                src={notavailable}
                                alt="Not Available"
                                className=" h-8 w-8"
                            />
                        )}
                    </span>
                    <button
                        onClick={() => {
                            setEditForm(true);
                            setId(i._id);
                        }}
                    >
                        <img src={edit} alt="edit" className="h-10 w-10" />
                    </button>
                    <button>
                        <img
                            src={deleteImg}
                            alt="delete"
                            className=" h-10 w-10"
                        />
                    </button>
                </li>
            ))}
        </ol>
    );
};

export default menuItems;
