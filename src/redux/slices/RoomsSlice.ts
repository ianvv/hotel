import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


export type RoomItem = {
    id: number;
    name: string;
    slug: string;
    price: number;
    size: number;
    smoking: boolean;
    capacity: number;
    pets: boolean;
    breakfast: boolean;
    featured: boolean;
    description: string;
    facilities: string[];
    images: string[];
}


export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async () => {
        const {data} = await axios.get(`https://6316727782797be77fe57fda.mockapi.io/rooms`);
        return data as RoomItem[];
    }
);

export const fetchRoom = createAsyncThunk(
    'rooms/fetchRoom',
    async (slug: string) => {
        const {data} = await axios.get(`https://6316727782797be77fe57fda.mockapi.io/rooms?slug=${slug}`);
        return data as RoomItem[];
    }
);

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface IRoomsSliceState {
    rooms: RoomItem[];
    sortedRooms: RoomItem[];
    featuredRooms: RoomItem[];
    status: string;
    maxPrice: number;
    singleRoom: RoomItem;
}

const initialState: IRoomsSliceState = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    status: Status.LOADING,
    maxPrice: 0,
    singleRoom: {} as RoomItem,
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setSortedRooms(state, action: PayloadAction<RoomItem[]>) {
            state.sortedRooms = action.payload;
        }
    },
    extraReducers: (builder) => {

        //------------- asyncThunk #1 fetchRooms -------------//

        builder.addCase(fetchRooms.pending, (state) => {
            state.status = Status.LOADING;
            state.rooms = [];
        });

        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.rooms = action.payload;
            state.sortedRooms = action.payload;
        });

        builder.addCase(fetchRooms.rejected, (state) => {
            state.status = Status.ERROR;
            alert('~~~~~~~ERROR~~~~~~~ ' + '|| fetchRooms');
            state.rooms = [];
        });

        //------------- asyncThunk #2 fetchRoom -------------//

        builder.addCase(fetchRoom.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchRoom.fulfilled, (state, action) => {
            state.singleRoom = action.payload[0];
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchRoom.rejected, (state) => {
            state.status = Status.ERROR;
            alert('~~~~~~~FETCHROOM  ERROR~~~~~~~');
        });
    }
});

export const roomsSelector = (state: RootState) => state.rooms;

export const { setSortedRooms } = roomsSlice.actions;

export default roomsSlice.reducer;