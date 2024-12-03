import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import api from "../api/api.jsx";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: "LOGIN", payload: response.data });
            setLoading(false);
        } catch (error) {
            const errorMessage =
                capitalize(error.response?.data?.message) ||
                "An unexpected error occurred.";
            setError(errorMessage);
            setLoading(false);
            throw error;
        }
    };
    return { login, loading, error };
};
