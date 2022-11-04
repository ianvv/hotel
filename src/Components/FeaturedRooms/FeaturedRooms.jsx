import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Title from "../Title/Title";
import RoomCard from "../RoomCard/RoomCard";
import Loading from "../Loading/Loading";
import {fetchRooms, roomsSelector} from "../../redux/slices/RoomsSlice";
import s from './featuredRooms.module.scss';


const FeaturedRooms = () => {

    const dispatch = useDispatch();
    const {rooms} = useSelector(roomsSelector);

    useEffect(() => {
        const getRooms = async () => {
            dispatch(fetchRooms());
        }
        getRooms();
    }, []);

    let nums = new Set();
    while(nums.size !== 3) {
        nums.add(Math.floor(Math.random() * 10) + 1);
    }

    nums = [...nums];

    nums.map((item) => {
        const particularObj = rooms[item];
        nums.push(particularObj);
    })

    if (!nums[5]) {
        return <Loading text='Featured rooms loading...'/>;
    }

    const roomItems =  nums.slice(3,6).map(room => <RoomCard key={room.id} {...room}/>);

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