import React, { createContext, useReducer, useContext } from "react";
import moment from "moment";

// Initial State
const initialState = {
    items: [],
    categories: [],
    tables: [],
    orders: [],
    sales: [],
    dish: [],
    daySales: [],
    monthSales: [],
    yearSales: [],
    dayDish: [],
    monthDish: [],
    yearDish: [],
};

// Actions
export const actions = {
    FETCH_ITEMS: "FETCH_ITEMS",
    ADD_ITEM: "ADD_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    EDIT_ITEM: "EDIT_ITEM",
    FETCH_CATEGORY: "FETCH_CATEGORY",
    ADD_CATEGORY: "ADD_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
    FETCH_TABLES: "FETCH_TABLES",
    ADD_TABLE: "ADD_TABLE",
    DELETE_TABLE: "DELETE_TABLE",
    FETCH_ORDER: "FETCH_ORDER",
    ADD_ORDER: "ADD_ORDER",
    DELETE_ORDER: "DELETE_ORDER",
    CHANGE_ORDER_STATUS: "CHANGE_ORDER_STATUS",
    FETCH_SALES: "FETCH_SALES",
    FETCH_DISH: "FETCH_DISH",
    CHECKOUT: "CHECKOUT",
};

// Utility function for filtering data
const filterDataByTime = (data, format) => {
    return data.filter(
        (item) =>
            moment(item.createdAt).format(format) === moment().format(format)
    );
};

// Reducer Function
const reducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_ITEMS:
            return { ...state, items: action.payload };

        case actions.ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };

        case actions.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    (item) => item._id !== action.payload
                ),
            };

        case actions.EDIT_ITEM:
            return {
                ...state,
                items: state.items.map((i) =>
                    i._id === action.payload._id ? action.payload : i
                ),
            };

        case actions.FETCH_CATEGORY:
            return { ...state, categories: action.payload };

        case actions.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case actions.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category._id !== action.payload
                ),
                items: state.items.filter(
                    (item) => item.category !== action.payload
                ),
            };

        case actions.FETCH_TABLES:
            return { ...state, tables: action.payload };

        case actions.ADD_TABLE:
            return { ...state, tables: [...state.tables, action.payload] };

        case actions.DELETE_TABLE:
            return {
                ...state,
                tables: state.tables.filter((t) => t._id !== action.payload),
            };

        case actions.FETCH_ORDER:
            return { ...state, orders: action.payload };

        case actions.ADD_ORDER:
            return { ...state, orders: action.payload };

        case actions.DELETE_ORDER:
            const updatedOrders = state.orders.map((o) => ({
                ...o,
                orderIds: [...o.orderIds.filter((id) => id !== action.payload)],
                count: o.orderIds.filter((id) => id !== action.payload).length,
            }));
            return {
                ...state,
                orders: updatedOrders.filter((o) => o.count > 0),
            };

        case actions.CHANGE_ORDER_STATUS:
            const updatedOrder = state.orders.map((order) =>
                JSON.stringify(order._id) === action.payload.tableId_ItemId
                    ? { ...order, status: action.payload.status }
                    : order
            );

            return {
                ...state,
                orders: [...updatedOrder],
            };

        case actions.FETCH_SALES:
            return {
                ...state,
                sales: action.payload,
                daySales: filterDataByTime(action.payload, "DD/MM/YY"),
                monthSales: filterDataByTime(action.payload, "MM/YY"),
                yearSales: filterDataByTime(action.payload, "YY"),
            };

        case actions.FETCH_DISH:
            return {
                ...state,
                dish: action.payload,
                dayDish: filterDataByTime(action.payload, "DD/MM/YY"),
                monthDish: filterDataByTime(action.payload, "MM/YY"),
                yearDish: filterDataByTime(action.payload, "YY"),
            };

        case actions.CHECKOUT:
            return {
                ...state,
                orders: state.orders.filter(
                    (order) => order.tableId !== action.payload
                ),
            };

        default:
            return state;
    }
};

// Create Context
const StoreContext = createContext();

// Store Provider
export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom Hook to Access Store
export const useStore = () => useContext(StoreContext);
