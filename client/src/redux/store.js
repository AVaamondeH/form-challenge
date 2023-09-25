import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const store = configureStore({
    reducer: {
        data: dataSlice,
    },
    middleware: [thunk],
});

export default store;