import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu/menu.jsx";
import Tables from "./components/tables/tables.jsx";
import AllOrders from "./components/orders/allOrders.jsx";
import { renderState, categorydata } from "./contexts/menuContext.jsx";
import axios from "./api/api.jsx";
import { Route, Routes, Navigate } from "react-router";
import PlaceOrder from "./components/orders/placeOrder.jsx";
import Checkout from "./components/bill/checkout.jsx";
import Sales from "./components/sales/sales.jsx";
import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/signup.jsx";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

//TODO: implement pagination in menu and order

const App = () => {
    const { user } = useAuthContext();
    const [render, setRender] = useState(0);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/category", {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });
                setCategory(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (user) {
            fetchCategories();
        }
    }, []);
    return (
        <>
            <Navbar />
            <renderState.Provider value={[render, setRender]}>
                <categorydata.Provider value={category}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                user ? <Menu /> : <Navigate to={"/login"} />
                            }
                        />
                        <Route
                            path="/tables"
                            element={
                                user ? <Tables /> : <Navigate to={"/login"} />
                            }
                        />
                        <Route
                            path="/orders/:id"
                            element={
                                user ? (
                                    <PlaceOrder />
                                ) : (
                                    <Navigate to={"/login"} />
                                )
                            }
                        />
                        <Route
                            path="/allorders"
                            element={
                                user ? (
                                    <AllOrders />
                                ) : (
                                    <Navigate to={"/login"} />
                                )
                            }
                        />
                        <Route
                            path="/checkout/:id"
                            element={
                                user ? <Checkout /> : <Navigate to={"/login"} />
                            }
                        />
                        <Route
                            path="/sales"
                            element={
                                user ? <Sales /> : <Navigate to={"/login"} />
                            }
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to={"/"} />}
                        />
                        <Route
                            path="/signup"
                            element={!user ? <Signup /> : <Navigate to={"/"} />}
                        />
                    </Routes>
                </categorydata.Provider>
            </renderState.Provider>
        </>
    );
};

export default App;
