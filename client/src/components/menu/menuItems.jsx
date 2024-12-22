import { useEffect, useState } from "react";

import rupee from "../../utils/currencyFormatter.jsx";
import { capitalize } from "../../utils/capitalize.jsx";

import api from "../../api/api.jsx";

import EditItem from "./editItem.jsx";

import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuCarrot } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { useStore, actions } from "../../contexts/storeContext.jsx";

const menuItems = ({ table, query }) => {
    //for requesting with token
    const { user } = useAuthContext();

    // state manager
    const { state, dispatch } = useStore();

    //edit form related
    const [editForm, setEditForm] = useState(false);
    const [edited, setEdited] = useState({
        item: "",
        price: 0.0,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const [ItemId, setItemId] = useState(0);
    const tobeEdited = (id) => {
        state.items.find((i) => {
            if (i._id == id) {
                setEdited(i);
            }
        });
    };

    //menu related
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/category", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                dispatch({ type: actions.FETCH_CATEGORY, payload: res.data });
            } catch (error) {
                console.log(error.message);
            }
        };
        const getItems = async () => {
            try {
                setLoading(true);
                const response = await api.get("/menu", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                dispatch({
                    type: actions.FETCH_ITEMS,
                    payload: response.data,
                });
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (user) {
            getItems();
            fetchCategories();
        }
    }, [user, dispatch]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/menu/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: actions.DELETE_ITEM, payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await api.delete(`/category/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            await api.delete(`/menu/all/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch({ type: actions.DELETE_CATEGORY, payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };

    let search = query
        ? state.items.filter((o) => o.item.toLowerCase().indexOf(query) > -1)
        : state.items;

    //order related
    const [order, setOrder] = useState({
        itemId: "",
        tableId: "",
    });

    useEffect(() => {
        const addOrders = async () => {
            try {
                const response = await api.post("/orders", order, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                dispatch({ type: actions.ADD_ORDER, payload: response.data });
            } catch (error) {
                console.log(error.message);
            }
        };
        if (order.itemId !== "") addOrders();
    }, [order]);

    //for loading
    const [loading, setLoading] = useState(true);
    if (loading) {
        return <div className="text-center text-xl p-4">Loading...</div>;
    }

    const renderTable = (filteredItems, isOrderTable = false) => {
        return (
            <table className="w-full table-auto border-collapse overflow-x-auto text-sm sm:text-base">
                {state.categories.map((cat, index) => (
                    <React.Fragment key={index}>
                        <thead>
                            <tr>
                                <th
                                    colSpan={isOrderTable ? 5 : 6}
                                    className="text-center text-lg sm:text-xl py-2"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {cat.name}
                                        <RiDeleteBin6Line
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleDeleteCategory(cat._id)
                                            }
                                        />
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="py-2 px-2">No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>V/N-V</th>
                                {isOrderTable ? (
                                    <th>Add</th>
                                ) : (
                                    <>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems
                                .filter((item) => item.category === cat._id)
                                .map((item, ind) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-amber-300"
                                    >
                                        <td className="text-center">
                                            {ind + 1}
                                        </td>
                                        <td className="text-left">
                                            <div className="font-semibold">
                                                {capitalize(item.item)}
                                            </div>
                                            <div className="text-sm font-thin">
                                                {item.description}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {rupee.format(item.price)}
                                        </td>
                                        <td className="text-center">
                                            {item.veg_or_nonveg === "veg" ? (
                                                <LuCarrot className="inline-block" />
                                            ) : (
                                                <GiChickenOven className="inline-block" />
                                            )}
                                        </td>
                                        {isOrderTable ? (
                                            <td className="text-center">
                                                <button
                                                    onClick={() =>
                                                        setOrder({
                                                            itemId: item._id,
                                                            tableId: table._id,
                                                        })
                                                    }
                                                >
                                                    <IoMdAddCircleOutline className="text-2xl" />
                                                </button>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setEditForm(true);
                                                            setItemId(item._id);
                                                            tobeEdited(
                                                                item._id
                                                            );
                                                        }}
                                                    >
                                                        <FaRegEdit />
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                        </tbody>
                    </React.Fragment>
                ))}
            </table>
        );
    };

    if (!table) {
        return (
            <>
                <EditItem
                    isVisible={editForm}
                    setIsVisible={setEditForm}
                    id={ItemId}
                    editItem={edited}
                    category={state.categories}
                />
                {renderTable(search)}
            </>
        );
    } else {
        const filtered =
            table.veg_or_nonveg === "both"
                ? search
                : search.filter(
                      (item) => item.veg_or_nonveg === table.veg_or_nonveg
                  );
        return renderTable(filtered, true);
    }
};

export default menuItems;
