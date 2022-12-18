import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RoomCard from "../RoomCard/RoomCard";
import Loading from "../Loading/Loading";
import { useAppDispatch } from "../../redux/store";
import {
  fetchRooms,
  roomsSelector,
  EStatus,
} from "../../redux/slices/RoomsSlice";
import {
  setMaxPrice,
  setMaxSize,
  setMinPrice,
  setMinSize,
} from "../../redux/slices/FilterSlice";
import s from "./roomsList.module.scss";
import { IRoomFilterProps } from "../RoomFilter/RoomFilter";

const RoomsList: React.FC<IRoomFilterProps> = ({ rooms }) => {
  const dispatch = useAppDispatch();
  const { status, sortedRooms } = useSelector(roomsSelector);
  const [visible, setVisible] = useState(6);

  const maxPrice = Math.max.apply(null, [...rooms.map((item) => item.price)]);
  const minPrice = Math.min.apply(null, [...rooms.map((item) => item.price)]);
  const maxSize = Math.max.apply(null, [...rooms.map((item) => item.size)]);
  const minSize = Math.min.apply(null, [...rooms.map((item) => item.size)]);

  useEffect(() => {
    const getRooms = () => {
      dispatch(fetchRooms());
    };
    getRooms();
  }, [dispatch]);

  useEffect(() => {
    const setFilterParams = () => {
      dispatch(setMaxPrice(maxPrice));
      dispatch(setMinPrice(minPrice));
      dispatch(setMinSize(minSize));
      dispatch(setMaxSize(maxSize));
    };
    status === EStatus.SUCCESS && setFilterParams();
  }, [dispatch, maxPrice, maxSize, minPrice, minSize, status]);

  const showMoreRooms = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const roomItems =
    rooms.length !== 0 ? (
      rooms
        .slice(0, visible)
        .map((room) => <RoomCard key={room.id} {...room} />)
    ) : (
      <div className={s.emptySearch}>
        <h3>unfortunately no rooms matched your search parameters...</h3>
      </div>
    );

  return (
    <section className={s.roomsList}>
      <div className={s.roomsListCenter}>
        {status === EStatus.LOADING ? (
          <Loading text="Rooms loading..." />
        ) : (
          roomItems
        )}
      </div>
      <div className={s.paginationWrapper}>
        {status !== EStatus.LOADING && sortedRooms.length > 6 && (
          <button
            className={s.paginationButton}
            onClick={showMoreRooms}
            // Here instead of 5 should be 6 but in my API are only 11 items
            disabled={visible + 5 - rooms.length > 0}
          >
            Load more rooms
          </button>
        )}
      </div>
    </section>
  );
};

export default RoomsList;
