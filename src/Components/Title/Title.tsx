import React from 'react';
import s from './title.module.scss';


interface ITitleProps {
    title: string;
}

const Title: React.FC<ITitleProps> = ({title}) => {

    return (
        <div className={s.sectionTitle}>
            <h4>{title}</h4>
            <div></div>
        </div>
    );
}

export default Title;