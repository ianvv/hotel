import React, { memo } from 'react';
import {Link} from "react-router-dom";

import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import s from '../assets/styles/commonStyles.module.scss';


const Error: React.FC = memo(() => {

    return (
        <Hero>
            <Banner title='404' subtitle='page not found'>
                <Link to='/' className={s.buttonPrimary}>
                    return home
                </Link>
            </Banner>
        </Hero>
    );
})

export default Error;