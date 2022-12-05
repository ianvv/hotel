import React from 'react';
import s from './banner.module.scss';


type TBannerProps = {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}


const Banner: React.FC<TBannerProps> = ({children, title, subtitle}) => {

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