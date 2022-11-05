import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {Slider} from "@mui/material";

import Title from "../Title/Title";
import {setSortedRooms} from "../../redux/slices/RoomsSlice";
import {filterSelector} from "../../redux/slices/FilterSlice";
import {getUnique} from "../../utilities/sideFunctions";
import s from './roomFilter.module.scss';


// The best way to implement this would be to use
// an API request with parameters, but I couldn't
// do it properly because I don't have a good enough API
// So I had to use the array filter method
const RoomFilter = ({rooms}) => {

    const dispatch = useDispatch();
    const {minPrice, maxPrice, minSize, maxSize} = useSelector(filterSelector);

    const [capacityOption, setCapacityOption] = useState(0);
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
    }, [minSize, maxSize]);

    let tempRooms = [...rooms];

    const resetDisabled = capacity === 0
                   && sliderValue === minPrice
                   && minSizeValue === minSize
                   && maxSize === maxSizeValue
                   && !breakfast
                   && !pets
                   && !smoking

    const capacityChangeHandler = (e) => {
        setCapacityOption(e);
        setCapacity(e.value);
    }

    let guests = getUnique(rooms, 'capacity');

    const options = guests.map(item => {
        return {label: item, value: item};
    })

    const onClickButton = () => {
        tempRooms = tempRooms.filter(room =>
            room.capacity === capacity
            && room.price <= sliderValue
            && room.size >= minSizeValue
            && room.size <= maxSizeValue
            && room.breakfast === breakfast
            && room.smoking === smoking
            && room.pets === pets
        );
        dispatch(setSortedRooms(tempRooms));
    }

    const resetButton = () => {
        let tempRooms = [...rooms];
        setCapacityOption(0);
        setCapacity(0);
        setSliderValue(minPrice);
        setMinSizeValue(minSize);
        setMaxSizeValue(maxSize);
        setBreakfast(false);
        setSmoking(false);
        setPets(false);
        dispatch(setSortedRooms(tempRooms));
    }

    return (
        <>
            <Title title='search rooms'/>
            <section className={s.filterForm}>
                <div className={s.formGroup}>
                    <label htmlFor="capacity">Capacity</label>
                    <Select
                        label='Capacity'
                        options={options}
                        value={capacityOption}
                        onChange={capacityChangeHandler}
                        style={{cursor: 'pointer'}}
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="price">room price ${sliderValue}</label>
                    <Slider
                        className={s.slider}
                        value={sliderValue}
                        min={minPrice}
                        max={maxPrice}
                        onChange={(e) => setSliderValue(e.target.value)}
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
                            onChange={(e) => setMinSizeValue(e.target.value)}
                        />
                        <input
                            className={s.sizeInput}
                            type="number"
                            name="maxSize"
                            id="maxSize"
                            min={minSize}
                            max={maxSize}
                            value={maxSizeValue}
                            onChange={(e) => setMaxSizeValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className={s.formGroup}>
                    <div className={s.singleExtra}>
                        <input
                            type="checkbox"
                            name='breakfast'
                            id='breakfast'
                            checked={breakfast}
                            onChange={() => setBreakfast(!breakfast)}
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className={s.singleExtra}>
                        <input
                            type="checkbox"
                            name='smoking'
                            id='smoking'
                            checked={smoking}
                            onChange={() => setSmoking(!smoking)}
                        />
                        <label htmlFor="breakfast">smoking</label>
                    </div>
                    <div className={s.singleExtra}>
                        <input
                            type="checkbox"
                            name='pets'
                            id='pets'
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
}

export default RoomFilter;