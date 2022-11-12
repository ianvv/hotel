import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rooms from './slices/RoomsSlice';
import filter from './slices/FilterSlice';


export const store = configureStore({
    reducer: {
        rooms,
        filter,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()