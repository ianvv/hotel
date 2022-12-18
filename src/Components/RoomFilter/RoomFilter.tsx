import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Slider } from "@mui/material";
import { SingleValue } from "react-select/dist/declarations/src/types";

import Title from "../Title/Title";
import { TRoomItem, setSortedRooms } from "../../redux/slices/RoomsSlice";
import { filterSelector } from "../../redux/slices/FilterSlice";
import { useAppDispatch } from "../../redux/store";
import { getUnique } from "../../utilities/sideFunctions";
import s from "./roomFilter.module.scss";

type TCapacityOption = {
  label: number;
  value: number;
};

export interface IRoomFilterProps {
  rooms: TRoomItem[];
}

// The best way to implement this would be to use
// an API request with parameters, but I couldn't
// do it properly because I don't have a good enough API,
// so I had to use the array filter method
export const RoomFilter: React.FC<IRoomFilterProps> = ({ rooms }) => {
  const dispatch = useAppDispatch();
  const { minPrice, maxPrice, minSize, maxSize } = useSelector(filterSelector);

  const [capacityOption, setCapacityOption] = useState<TCapacityOption | null>(
    null
  );
  const [capacity, setCapacity] = useState(0);
  const [sliderValue, setSliderValue] = useState(minPrice);
  const [minSizeValue, setMinSizeValue] = useState(minSize);
  const [maxSizeValue, setMaxSizeValue] = useState(maxSize);
  const [breakfast, setBreakfast] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [pets, setPets] = useState(false);

  useEffect(() => {
    setMinSizeValue(minSize);
    setMaxSizeValue(maxSize);
    setSliderValue(minPrice);
  }, [minSize, maxSize, minPrice]);

  let tempRooms = [...rooms];

  const resetDisabled =
    capacity === 0 &&
    sliderValue === minPrice &&
    minSizeValue === minSize &&
    maxSize === maxSizeValue &&
    !breakfast &&
    !pets &&
    !smoking;

  const capacityChangeHandler = (option: SingleValue<TCapacityOption>) => {
    setCapacityOption(option);
    setCapacity(option ? option.value : 0);
  };

  const onClickButton = () => {
    tempRooms = tempRooms.filter(
      (room) =>
        room.capacity === capacity &&
        room.price <= sliderValue &&
        room.size >= minSizeValue &&
        room.size <= maxSizeValue &&
        room.breakfast === breakfast &&
        room.smoking === smoking &&
        room.pets === pets
    );
    dispatch(setSortedRooms(tempRooms));
  };

  const resetButton = () => {
    let tempRooms = [...rooms];
    setCapacityOption(null);
    setCapacity(0);
    setSliderValue(minPrice);
    setMinSizeValue(minSize);
    setMaxSizeValue(maxSize);
    setBreakfast(false);
    setSmoking(false);
    setPets(false);
    dispatch(setSortedRooms(tempRooms));
  };

  if (rooms.length <= 0) {
    return <></>;
  }

  let guests = getUnique(rooms, "capacity");

  const options: TCapacityOption[] = guests.map((item) => {
    return { label: Number(item), value: Number(item) };
  });

  return (
    <>
      <Title title="search rooms" />
      <section className={s.filterForm}>
        <div className={s.formGroup}>
          <label htmlFor="capacity">Capacity</label>
          <Select
            options={options}
            value={capacityOption}
            onChange={capacityChangeHandler}
          />
        </div>
        <div className={s.formGroup}>
          <label htmlFor="price">room price ${sliderValue}</label>
          <Slider
            className={s.slider}
            value={sliderValue}
            min={minPrice}
            max={maxPrice}
            onChange={(_, value) => setSliderValue(value as number)}
          />
        </div>
        <div className={s.formGroup}>
          <label htmlFor="size">room size</label>
          <div className={s.sizeInputs}>
            <input
              className={s.sizeInput}
              type="number"
              name="minSize"
              min={minSize}
              max={maxSize}
              id="minSize"
              value={minSizeValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMinSizeValue(Number(e.target.value))
              }
            />
            <input
              className={s.sizeInput}
              type="number"
              name="maxSize"
              id="maxSize"
              min={minSize}
              max={maxSize}
              value={maxSizeValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxSizeValue(Number(e.target.value))
              }
            />
          </div>
        </div>
        <div className={s.formGroup}>
          <div className={s.singleExtra}>
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={() => setBreakfast(!breakfast)}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className={s.singleExtra}>
            <input
              type="checkbox"
              name="smoking"
              id="smoking"
              checked={smoking}
              onChange={() => setSmoking(!smoking)}
            />
            <label htmlFor="breakfast">smoking</label>
          </div>
          <div className={s.singleExtra}>
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={() => setPets(!pets)}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>
        <div className={s.filterButtons}>
          <button
            onClick={onClickButton}
            className={s.filterButton}
            disabled={capacity === 0}
          >
            Find a room
          </button>
          <button
            onClick={resetButton}
            className={s.filterButton}
            disabled={resetDisabled}
          >
            Reset
          </button>
        </div>
      </section>
    </>
  );
};
