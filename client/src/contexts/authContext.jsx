import { createContext, useEffect, useReducer } from "react";

import api from "../api/api"
import { CustomError } from "../../../server/utils/customError";

export const authContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });
    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await api.get("/auth/authCheck");
                if (response.data.user) {
                    dispatch({ type: "LOGIN", payload: response.data.user[0] });
                }
            } catch (error) {
                CustomError(error.message, error.statusCode);
            }
        }
        authCheck();
    }, []);
    console.log("authContext state: final ", state);
    return (
        <authContext.Provider value={{ ...state, dispatch }}>
            {children}
        </authContext.Provider>
    );
};
