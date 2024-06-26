import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu/menu.jsx";
import Tables from "./components/tables/tables.jsx";
import AllOrders from "./components/orders/allOrders.jsx";
import { renderState, categorydata } from "./contexts/menuContext.jsx";
import axios from "./api/api.jsx";
import { Route, Routes, useNavigate } from "react-router";
import PlaceOrder from "./components/orders/placeOrder.jsx";

//TODO: implement pagination in menu and order
//TODO: implement search in menu and order
//TODO: Implement a order hsitory page where is the order status is cancelled or delivered it will move from allOrders to orderHistory

const App = () => {
    const [render, setRender] = useState(0);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/category");
                setCategory(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCategories();
    }, []);
    return (
        <>
            <Navbar />
            <renderState.Provider value={[render, setRender]}>
                <categorydata.Provider value={category}>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route path="/orders/:id" element={<PlaceOrder />} />
                        <Route path="/allorders" element={<AllOrders />} />
                    </Routes>
                </categorydata.Provider>
            </renderState.Provider>
        </>
    );
};

export default App;
