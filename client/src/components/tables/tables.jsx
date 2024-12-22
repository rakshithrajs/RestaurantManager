import { useEffect, useState } from "react";
import moment from "moment";
import { capitalize } from "../../utils/capitalize.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

import AddTable from "./addTable.jsx";
import Table from "./table.jsx";

import { IoMdAddCircleOutline } from "react-icons/io";

import api from "../../api/api.jsx";
import { actions, useStore } from "../../contexts/storeContext.jsx";

const Tables = () => {
    const { user } = useAuthContext(); // Auth token
    const { state, dispatch } = useStore(); // Access state and dispatch from store

    // State for modals
    const [isAddTableOpen, setAddTableOpen] = useState(false);
    const [isTableDetailOpen, setTableDetailOpen] = useState(false);
    const [tableData, setTableData] = useState({
        tableNo: 0,
        customerName: "",
        occupants: 0,
        veg_or_nonveg: "",
    });

    // Local state to track tables and waiting times
    const [localTables, setLocalTables] = useState([]);

    // Fetch tables data from API (only once when component mounts)
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await api.get("/tables", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                dispatch({
                    type: actions.FETCH_TABLES,
                    payload: response.data,
                });
                setLocalTables(response.data); // Initialize local tables
            } catch (error) {
                console.error("Error fetching tables:", error.message);
            }
        };

        if (user) {
            fetchTables();
        }
    }, [user, dispatch]);

    // Sync localTables with state.tables whenever it changes
    useEffect(() => {
        setLocalTables(state.tables);
    }, [state.tables]);

    // Update waiting times dynamically every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setLocalTables((prevTables) =>
                prevTables.map((table) => ({
                    ...table,
                    waitingTime: table.createdAt
                        ? moment(table.createdAt).fromNow(true)
                        : "Just Now",
                }))
            );
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="relative h-[91vh] bg-gradient-to-b from-gray-100 to-gray-300">
            {/* Add Table Modal */}
            <AddTable isOpen={isAddTableOpen} setIsOpen={setAddTableOpen} />

            {/* Table Detail Modal */}
            <Table
                isOpen={isTableDetailOpen}
                setIsOpen={setTableDetailOpen}
                table={tableData}
            />

            {/* Header */}
            <h1 className="text-center text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
                Live Tables
            </h1>

            {/* Floating Add Button */}
            {!isAddTableOpen && !isTableDetailOpen && (
                <button
                    onClick={() => setAddTableOpen(true)}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition-transform transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <IoMdAddCircleOutline className="text-4xl" />
                </button>
            )}

            {/* Table Display */}
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:px-12 lg:px-20">
                {localTables.map((table, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setTableDetailOpen(true);
                            setTableData(table);
                        }}
                        className="flex flex-col items-center justify-center w-full max-w-xs mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                    >
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Table {table.tableNo}
                        </h1>
                        <p className="mt-2 text-lg text-gray-500">
                            {table.waitingTime
                                ? `Arrived ${table.waitingTime} ago`
                                : "Just Now"}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                            {table.occupants} occupant(s) |{" "}
                            {capitalize(table.veg_or_nonveg)}
                        </p>
                    </button>
                ))}
            </main>
        </div>
    );
};

export default Tables;
