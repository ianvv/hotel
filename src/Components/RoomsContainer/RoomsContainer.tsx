import React from 'react';
import {useSelector} from "react-redux";

import RoomsList from "../RoomsList/RoomsList";
import {RoomFilter} from "../RoomFilter/RoomFilter";
import {roomsSelector} from "../../redux/slices/RoomsSlice";


const RoomsContainer: React.FC = () => {

    const {rooms, sortedRooms} = useSelector(roomsSelector);

    return (
        <div>
            <RoomFilter rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </div>
    );
}

export default RoomsContainer;