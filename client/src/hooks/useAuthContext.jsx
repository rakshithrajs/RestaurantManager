import { authContext } from "../contexts/authContext.jsx";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw Error(
            "useAuthContext must be used inside an authContextProvieder"
        );
    }
    return context;
};
