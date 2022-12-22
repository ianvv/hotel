import React from 'react';
import s from './hero.module.scss';


interface IHeroProps {
    children: React.ReactNode;
    hero?: string;
}


const Hero: React.FC<IHeroProps> = ({children, hero}) => {

    return (
        <div className={ hero ? hero : s.defaultHero}>
            {children}
        </div>
    );
}

export default Hero;