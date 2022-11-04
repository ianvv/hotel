import React from 'react';
import s from './banner.module.scss';


const Banner = ({ children, title, subtitle }) => {

    return (
        <div className={s.banner}>
            <h1>{title}</h1>
            <div></div>
            <p>{subtitle}</p>
            {children}
        </div>
    );
}

export default Banner;