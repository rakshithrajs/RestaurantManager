import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/api.jsx";
import moment from "moment";
import rupee from "../../utils/currencyFormatter.jsx";

const sales = () => {
    const [sales, setSales] = useState([]);
    const [yearfiltered, setYearsales] = useState(0);
    const [monthfiltered, setMonthsales] = useState(0);
    const [dayfilteredsales, setdaysales] = useState(0);
    const [yeardish, setYeardish] = useState([
        {
            _id: "",
            itemName: "",
        },
    ]);
    const [monthdish, setMonthdish] = useState([
        {
            _id: "",
            itemName: "",
        },
    ]);
    const [daydish, setdaydish] = useState([
        {
            _id: "",
            itemName: "",
        },
    ]);
    const [dish, setDish] = useState([]);
    useEffect(() => {
        const getSales = async () => {
            try {
                const response = await api.get("/sales");
                setSales(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getSales();
    }, []);
    useEffect(() => {
        const getDish = async () => {
            try {
                const response = await api.get("/sales/dish");
                setDish(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getDish();
    }, []);
    useEffect(() => {
        let filtered = sales.filter(
            (i) =>
                moment(i.createdAt).format("DD/MM/YY") ===
                moment().format("DD/MM/YY")
        );
        setdaysales(filtered);
        let dishes = dish.filter(
            (i) =>
                moment(i.createdAt).format("DD/MM/YY") ===
                moment().format("DD/MM/YY")
        );
        setdaydish(dishes);
        filtered = sales.filter(
            (i) =>
                moment(i.createdAt).format("MM/YY") === moment().format("MM/YY")
        );
        setMonthsales(filtered);
        dishes = dish.filter(
            (i) =>
                moment(i.createdAt).format("MM/YY") === moment().format("MM/YY")
        );
        setMonthdish(dishes);
        filtered = sales.filter(
            (i) => moment(i.createdAt).format("YY") === moment().format("YY")
        );
        setYearsales(filtered);
        dishes = dish.filter(
            (i) => moment(i.createdAt).format("YY") === moment().format("YY")
        );
        setYeardish(dishes);
    }, [sales, dish]);
    // console.log(daydish)
    return (
        <React.Fragment>
            <div className=" grid grid-cols-1 mt-5 mb-5 md:grid-cols-2">
                <section className=" grid grid-cols-2 gap-[2vw] w-fit inset-0 bg-black bg-opacity-25 backdrop-blur-sm rounded-md p-[4vw] m-[2vw] mr-[1vw] mb-[1vw]">
                    <h1 className=" row-span-3 my-auto text-[2.88vw] text-center tracking-wide">
                        Sales
                    </h1>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            Today's Sales
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {dayfilteredsales ? (
                                rupee.format(
                                    dayfilteredsales.reduce(
                                        (acc, item) => acc + item.total,
                                        0
                                    )
                                )
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            Monthly Sales
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {monthfiltered ? (
                                rupee.format(
                                    monthfiltered.reduce(
                                        (acc, item) => acc + item.total,
                                        0
                                    )
                                )
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            Yearly Sales
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {yearfiltered ? (
                                rupee.format(
                                    yearfiltered.reduce(
                                        (acc, item) => acc + item.total,
                                        0
                                    )
                                )
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                </section>
                <section className=" grid grid-cols-2 gap-[2vw] w-fit inset-0 bg-black bg-opacity-25 backdrop-blur-sm rounded-md p-[4vw] m-[2vw] ml-[1vw] mb-[1vw]">
                    <h1 className=" row-span-3 my-auto text-[2.88vw] text-center tracking-wide">
                        Most Sold Dish
                    </h1>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            Today
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {daydish ? (
                                daydish.flatMap((i, index) => {
                                    if (index >= 1) {
                                        return;
                                    }
                                    return (
                                        <span key={index}>{i.itemName}</span>
                                    );
                                })
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            This Month
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {monthdish ? (
                                monthdish.flatMap((i, index) => {
                                    if (index >= 1) {
                                        return;
                                    }
                                    return (
                                        <span key={index}>{i.itemName}</span>
                                    );
                                })
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="text-center col-start-2 col-end-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-widest text-gray-900 dark:text-white">
                            This Year
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {yeardish ? (
                                yeardish.flatMap((i, index) => {
                                    if (index >= 1) {
                                        return;
                                    }
                                    return (
                                        <span key={index}>{i.itemName}</span>
                                    );
                                })
                            ) : (
                                <span className="font-normal text-gray-700 dark:text-gray-400">
                                    No Sales
                                </span>
                            )}
                        </p>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};

export default sales;
