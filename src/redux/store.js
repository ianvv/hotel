import { configureStore } from '@reduxjs/toolkit';
import rooms from './slices/RoomsSlice';
import filter from './slices/FilterSlice';


export const store = configureStore({
    reducer: {
        rooms,
        filter,
    },
});