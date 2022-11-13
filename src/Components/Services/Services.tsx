import React, { ReactNode } from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';

import Title from "../Title/Title";
import s from './services.module.scss';


type TServicesItem = {
    icon: ReactNode;
    title: string;
    info: string;
}

const services: TServicesItem[] = [
    {
        icon: <FaCocktail/>,
        title: 'Free cocktails',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        icon: <FaHiking/>,
        title: 'Endless hiking',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        icon: <FaShuttleVan/>,
        title: 'Free shuttle',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        icon: <FaBeer/>,
        title: 'Strongest beer',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
];


const Services: React.FC = () => {

    return (
        <section className={s.services}>
            <Title title='services'/>
            <div className={s.servicesCenter}>
                {
                    services.map((obj, index) => {
                        return (
                            <article key={index} className={s.service}>
                                <span>{obj.icon}</span>
                                <h6>{obj.title}</h6>
                                <p>{obj.info}</p>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default Services;