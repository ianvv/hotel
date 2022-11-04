import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    smoking: false,
    breakfast: false,
    pets: false,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        setMinSize(state, action) {
            state.minSize = action.payload;
        },
        setMaxSize(state, action) {
            state.maxSize = action.payload;
        },
    },
});

export const filterSelector = (state) => state.filter;

export const { setMaxPrice, setMinPrice, setMinSize, setMaxSize } = filterSlice.actions;

export default filterSlice.reducer;