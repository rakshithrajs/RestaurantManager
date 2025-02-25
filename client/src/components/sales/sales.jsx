import { useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../api/api.jsx";
import rupee from "../../utils/currencyFormatter.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { useStore, actions } from "../../contexts/storeContext.jsx"; // Import useStore and actions

const Sales = () => {
    const { user } = useAuthContext();
    const { state, dispatch } = useStore();

    // Fetch sales and dish data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesRes, dishRes] = await Promise.all([
                    api.get("/sales", {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }),
                    api.get("/sales/dish", {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }),
                ]);

                // Dispatch actions to update store
                dispatch({ type: actions.FETCH_SALES, payload: salesRes.data });
                dispatch({ type: actions.FETCH_DISH, payload: dishRes.data });
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        if (user) fetchData();
    }, [user, dispatch]);

    // Animation Variants
    const cardVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const hoverEffect = { scale: 1.02, rotate: 0.5 };

    // Reusable Card Component
    const StatCard = ({ title, value, isCurrency = false, delay = 0 }) => (
        <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            whileHover={hoverEffect}
            transition={{ duration: 0.4, delay }}
            className="max-w-sm p-6 text-center bg-white/80 backdrop-blur-md rounded-xl shadow-lg transform hover:shadow-2xl"
        >
            <h5 className="mb-3 text-lg font-semibold text-gray-800">
                {title}
            </h5>
            <p className="text-xl font-bold text-gray-700">
                {value.length > 0
                    ? isCurrency
                        ? rupee.format(
                              value.reduce((acc, item) => acc + item.total, 0)
                          )
                        : value[0].itemName || "No Data"
                    : "No Data"}
            </p>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-[91vh] flex justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
        >
            <div className="w-full max-w-7xl px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Sales Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Track your sales and top-performing dishes in real-time.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Sales Overview */}
                    <section>
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">
                            Sales Overview
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                            <StatCard
                                title="Today's Sales"
                                value={state.daySales || []}
                                isCurrency={true}
                                delay={0.1}
                            />
                            <StatCard
                                title="Monthly Sales"
                                value={state.monthSales || []}
                                isCurrency={true}
                                delay={0.2}
                            />
                            <StatCard
                                title="Yearly Sales"
                                value={state.yearSales || []}
                                isCurrency={true}
                                delay={0.3}
                            />
                        </div>
                    </section>

                    {/* Most Sold Dish */}
                    <section>
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">
                            Most Sold Dish
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                            <StatCard
                                title="Today"
                                value={state.dayDish || []}
                                delay={0.4}
                            />
                            <StatCard
                                title="This Month"
                                value={state.monthDish || []}
                                delay={0.5}
                            />
                            <StatCard
                                title="This Year"
                                value={state.yearDish || []}
                                delay={0.6}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default Sales;
