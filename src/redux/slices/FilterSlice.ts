import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


interface IFilterSliceState {
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    smoking: boolean;
    breakfast: boolean;
    pets: boolean;
}

const initialState: IFilterSliceState = {
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
        setMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload;
        },
        setMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload;
        },
        setMinSize(state, action: PayloadAction<number>) {
            state.minSize = action.payload;
        },
        setMaxSize(state, action: PayloadAction<number>) {
            state.maxSize = action.payload;
        },
    },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setMaxPrice, setMinPrice, setMinSize, setMaxSize } = filterSlice.actions;

export default filterSlice.reducer;