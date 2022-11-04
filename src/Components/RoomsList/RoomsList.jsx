import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import RoomCard from "../RoomCard/RoomCard";
import Loading from "../Loading/Loading";
import {fetchRooms, loadingStatus, roomsSelector} from "../../redux/slices/RoomsSlice";
import {setMaxPrice, setMaxSize, setMinPrice, setMinSize} from "../../redux/slices/FilterSlice";
import s from './roomsList.module.scss';


const RoomsList = ({rooms}) => {

    const dispatch = useDispatch();
    const {status, sortedRooms} = useSelector(roomsSelector);
    const [visible, setVisible] = useState(6);

    const maxPrice = Math.max.apply(null, [...rooms.map(item => item.price)]);
    const minPrice = Math.min.apply(null, [...rooms.map(item => item.price)]);
    const maxSize = Math.max.apply(null, [...rooms.map(item => item.size)]);
    const minSize = Math.min.apply(null, [...rooms.map(item => item.size)]);

    useEffect(() => {
        const getRooms = async () => {
            dispatch(fetchRooms());
        }
        getRooms();
    }, []);

    useEffect(() => {
        const setFilterParams = async () => {
            dispatch(setMaxPrice(maxPrice));
            dispatch(setMinPrice(minPrice));
            dispatch(setMinSize(minSize));
            dispatch(setMaxSize(maxSize));
        }
        status === loadingStatus.SUCCESS && setFilterParams();
    }, [status]);

    const showMoreRooms = () => {
        setVisible(prevValue => prevValue + 6);
    }

    const roomItems = rooms.length !== 0
        ? rooms.slice(0, visible).map(room => <RoomCard key={room.id} {...room} />)
        : <div className={s.emptySearch}>
            <h3>unfortunately no rooms matched your search parameters...</h3>
        </div>

    return (
        <section className={s.roomsList}>
            <div className={s.roomsListCenter}>
                {
                    status === loadingStatus.LOADING
                        ? <Loading text='Rooms loading...'/>
                        : roomItems
                }
            </div>
            <div className={s.paginationWrapper}>
                {
                    status === loadingStatus.LOADING
                        ? <div></div>
                        : sortedRooms.length < 6 ? <div></div> : <button
                            className={s.paginationButton}
                            onClick={showMoreRooms}
                            // Here instead of 5 should be 6 but in my API are only 11 items
                            disabled={visible + 5 - rooms.length > 0}
                        >
                            Load more rooms
                        </button>
                }
            </div>
        </section>
    );
}

export default RoomsList;