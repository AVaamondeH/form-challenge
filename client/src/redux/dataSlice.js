import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint } from "../../utils/endpoint";

const initialState = {
    id: "",
    json: [],
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addId: (state, action) => {
            state.id = action.payload;
        },
        addJson: (state, action) => {
            state.json = action.payload;
        },
    },
});

export const { addId, addJson } = dataSlice.actions;
export default dataSlice.reducer;
export const set_id = (id) => async (dispatch) => {
    dispatch(addId(id));
};
export const get_form = (id) => async (dispatch) => {
    const response = await axios(`${endpoint}${id}`);
    const { data } = response;
    dispatch(addJson(data.data.json));
};
