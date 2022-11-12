import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import Title from "../Title/Title";
import RoomCard from "../RoomCard/RoomCard";
import Loading from "../Loading/Loading";
import {useAppDispatch} from "../../redux/store";
import {fetchRooms, RoomItem, roomsSelector} from "../../redux/slices/RoomsSlice";
import s from './featuredRooms.module.scss';


const FeaturedRooms = () => {

    const dispatch = useAppDispatch();
    const {rooms} = useSelector(roomsSelector);

    useEffect(() => {
        const getRooms = () => {
            dispatch(fetchRooms());
        }
        getRooms();
    }, []);

    const featuredRoomsArray: RoomItem[] = [];

    let nums = new Set<number>();

    while(nums.size !== 3) {
        nums.add(Math.floor(Math.random() * 11));
    }

    const convertedArray = Array.from(nums);

    convertedArray.map((num) => {
        const particularObj = rooms[num];
        featuredRoomsArray.push(particularObj);
    })

    if (!featuredRoomsArray[2]) {
        return <Loading text='Featured rooms loading...'/>;
    }

    const roomItems =  featuredRoomsArray.map(room => <RoomCard key={room.id} {...room}/>);

    return (
        <section className={s.featuredRooms}>
            <Title title='featured rooms'/>
            <div className={s.featuredRoomsCenter}>
                {
                    roomItems
                }
            </div>
        </section>
    );
}

export default FeaturedRooms;