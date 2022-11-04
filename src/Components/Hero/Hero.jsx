import React from 'react';
import s from './hero.module.scss';


const Hero = ({children, hero}) => {

    return (
        <div className={ hero ? hero : s.defaultHero}>
            {children}
        </div>
    );
}

export default Hero;