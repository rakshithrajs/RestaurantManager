import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin.jsx";

const logIn = () => {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bg-gray-100 flex justify-center items-center">
            <div className="lg:p-[135px] p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="text-blue-500"
                        />
                        <label
                            htmlFor="remember"
                            className="text-gray-600 ml-2"
                        >
                            Remember Me
                        </label>
                    </div>
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className={
                            !loading
                                ? "bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                                : "bg-blue-500 opacity-50 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        }
                    >
                        Login
                    </button>
                    {error && (
                        <div
                            className="bg-red-100 border mt-[1vw] border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">{error}</strong>
                        </div>
                    )}
                </form>
                <div className="mt-6 text-blue-500 text-center">
                    <Link to={"/signup"} className="hover:underline">
                        Sign up Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default logIn;
