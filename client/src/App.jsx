import React, { useState } from "react";

import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu/menu.jsx";
import Tables from "./components/tables/tables.jsx";
import AllOrders from "./components/orders/allOrders.jsx";
import PlaceOrder from "./components/orders/placeOrder.jsx";
import Checkout from "./components/bill/checkout.jsx";
import Sales from "./components/sales/sales.jsx";
import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/signup.jsx";

import { renderState } from "./contexts/renderContext.jsx";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

import { Route, Routes, Navigate } from "react-router";

//TODO: implement pagination in menu and order

const App = () => {
    //for auth
    const { user } = useAuthContext();

    //for rendering
    const [render, setRender] = useState(0);
    return (
        <>
            <Navbar />

            {/* react router dom */}
            <renderState.Provider value={[render, setRender]}>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Menu /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/tables"
                        element={user ? <Tables /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/orders/:id"
                        element={
                            user ? <PlaceOrder /> : <Navigate to={"/login"} />
                        }
                    />
                    <Route
                        path="/allorders"
                        element={
                            user ? <AllOrders /> : <Navigate to={"/login"} />
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
                        element={user ? <Sales /> : <Navigate to={"/login"} />}
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
            </renderState.Provider>
        </>
    );
};

export default App;
