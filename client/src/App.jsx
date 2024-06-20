import React, { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Menu from "./components/menu.jsx";
import { menuState } from "./contexts/menuContext.jsx";

const App = () => {
    const [render, setRender] = useState(0);
    return (
        <>
            <Navbar />
            <menuState.Provider value={[render, setRender]}>
                    <Menu />
            </menuState.Provider>
        </>
    );
};

export default App;
