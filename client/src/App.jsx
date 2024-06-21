import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu/menu.jsx";
import Tables from "./components/tables/tables.jsx"
import { menuState, categorydata } from "./contexts/menuContext.jsx";
import axios from "./api/api.jsx";
import { Route, Routes } from "react-router";

const App = () => {
    const [render, setRender] = useState(0);
    const [category, setCategory] = useState({
        id: "",
        name: "",
    });
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
                        <menuState.Provider value={[render, setRender]}>
                            <categorydata.Provider value={category}>
                                <Menu />
                            </categorydata.Provider>
                        </menuState.Provider>
                    }
                />
                <Route path="/tables" element={<Tables />} />
            </Routes>
        </>
    );
};

export default App;
