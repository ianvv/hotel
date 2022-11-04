import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async () => {
        const {data} = await axios.get(
            `https://6316727782797be77fe57fda.mockapi.io/rooms`
        );
        return data;
    }
);

export const fetchRoom = createAsyncThunk(
    'rooms/fetchRoom',
    async (slug) => {
        const {data} = await axios.get(`https://6316727782797be77fe57fda.mockapi.io/rooms?slug=${slug}`);
        return data;
    }
);

export const loadingStatus = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

const initialState = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    status: loadingStatus.LOADING,
    maxPrice: 0,
    singleRoom: {},
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setSortedRooms(state, action) {
            state.sortedRooms = action.payload;
        }
    },
    extraReducers: (builder) => {

        //------------- asyncThunk #1 fetchRooms -------------//

        builder.addCase(fetchRooms.pending, (state) => {
            state.status = loadingStatus.LOADING;
            state.rooms = [];
        });

        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.status = loadingStatus.SUCCESS;
            state.rooms = action.payload;
            state.sortedRooms = action.payload;
        });

        builder.addCase(fetchRooms.rejected, (state) => {
            state.status = loadingStatus.ERROR;
            alert('~~~~~~~ERROR~~~~~~~ ' + '|| fetchRooms');
            state.rooms = [];
        });

        //------------- asyncThunk #2 fetchRoom -------------//

        builder.addCase(fetchRoom.pending, (state) => {
            state.singleRoom = {};
            state.status = loadingStatus.LOADING;
        });

        builder.addCase(fetchRoom.fulfilled, (state, action) => {
            state.singleRoom = action.payload[0];
            state.status = loadingStatus.SUCCESS;
        });

        builder.addCase(fetchRoom.rejected, (state) => {
            state.status = loadingStatus.ERROR;
            state.single = {};
            alert('~~~~~~~ERROR~~~~~~~ ' + '|| fetchRoom');
        });
    }
});

export const roomsSelector = (state) => state.rooms;

export const {setSortedRooms} = roomsSlice.actions;

export default roomsSlice.reducer;