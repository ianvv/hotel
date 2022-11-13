import { TRoomItem } from "../redux/slices/RoomsSlice"


export const getUnique = (items: TRoomItem[], value: keyof TRoomItem) => {
    return [...new Set(items.map(item => item[value]))]
}