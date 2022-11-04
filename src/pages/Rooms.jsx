import React from 'react';
import {Link} from "react-router-dom";

import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import RoomsContainer from "../Components/RoomsContainer/RoomsContainer";
import s from '../assets/styles/commonStyles.module.scss';
import styles from '../Components/Hero/hero.module.scss';


const Rooms = () => {

    return (
        <>
            <Hero hero={styles.roomsHero}>
                <Banner title='our rooms'>
                    <Link to='/' className={s.buttonPrimary}>
                        return home
                    </Link>
                </Banner>
            </Hero>
            <RoomsContainer/>
        </>
    );
}

export default Rooms;