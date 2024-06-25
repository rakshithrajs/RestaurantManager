import { useContext, useEffect, useState } from "react";
import { renderState } from "../../contexts/menuContext.jsx";
import AddTable from "./addTable.jsx";
import Table from "./table.jsx";
import plus from "/plus.png";
import api from "../../api/api.jsx";
import moment from "moment";

const tables = () => {
    const [render, setRender] = useContext(renderState);
    const [tables, setTables] = useState([]);
    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await api.get("/tables");
                setTables(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getTables();
    }, [render]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedTables = tables.map((t) => ({
                ...t,
                waitingTime: moment(t.createdAt).toNow().slice(2),
            }));
            setTables(updatedTables);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [tables]);
    const [isActive, setIsActive] = useState(false);
    const [isTableOpen, setTableOpen] = useState(false);
    const [tableData, setTableData] = useState({
        tableNo: 0,
        customerName: "",
        occupants: 0,
        veg_or_nonveg: "",
    });
    return (
        <div className="relative">
            <AddTable isOpen={isActive} setIsOpen={setIsActive} />
            <Table
                isOpen={isTableOpen}
                setIsOpen={setTableOpen}
                table={tableData}
            />
            <h1 className=" text-center text-3xl font-bold">Live Tables</h1>
            <button
                onClick={() => {
                    setIsActive(!isActive);
                }}
                className=" fixed bg-blue-700 text-white bg-opacity-80 p-[0.5vw] bottom-[3vw] left-[3vw] rounded-full"
            >
                <img src={plus} alt="Add Table" className=" size-12 invert" />
            </button>
            <main className="flex items-center justify-center gap-10 mt-8 flex-wrap">
                {tables.map((t, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setTableOpen(!isTableOpen);
                            setTableData(t);
                        }}
                        className="space-y-[1vw] flex flex-col justify-center items-center cursor-pointer size-[200px] rounded-full bg-sky-500 bg-opacity-55 border border-black transition-all hover:bg-opacity-65 hover:scale-105 hover:font-extrabold"
                    >
                        <h1 className="text-3xl font-bold ">{t.tableNo}</h1>
                        <div> {!t.waitingTime? "Just Now" : `arrived ${t.waitingTime} ago`} </div>
                    </button>
                ))}
            </main>
        </div>
    );
};

export default tables;
