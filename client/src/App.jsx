import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu/menu.jsx";
import Tables from "./components/tables/tables.jsx";
import { renderState, categorydata } from "./contexts/menuContext.jsx";
import axios from "./api/api.jsx";
import { Route, Routes, useNavigate } from "react-router";
import PlaceOrder from "./components/orders/placeOrder.jsx";

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
            <Routes>
                <Route
                    path="/"
                    element={
                        <renderState.Provider value={[render, setRender]}>
                            <categorydata.Provider value={category}>
                                <Menu />
                            </categorydata.Provider>
                        </renderState.Provider>
                    }
                />
                <Route
                    path="/tables"
                    element={
                        <renderState.Provider value={[render, setRender]}>
                            <Tables />
                        </renderState.Provider>
                    }
                />
                <Route
                    path="/orders/:id"
                    element={
                        <renderState.Provider value={[render, setRender]}>
                            <categorydata.Provider value={category}>
                                <PlaceOrder />
                            </categorydata.Provider>
                        </renderState.Provider>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
