import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import api from "../api/api.jsx";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const response = await api.post("/auth/signup", {
                email,
                password,
            });
            localStorage.setItem("user", JSON.stringify(response));
            dispatch({ type: "LOGIN", payload: response });
            setLoading(false);
        } catch (error) {
            setError(error.response.data);
            console.log(error);
            setLoading(false);
        }
    };
    return { signup, loading, error };
};
