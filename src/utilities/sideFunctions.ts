import { RoomItem } from "../redux/slices/RoomsSlice"


export const getUnique = (items: RoomItem[], value: keyof RoomItem) => {
    return [...new Set(items.map(item => item[value]))]
}