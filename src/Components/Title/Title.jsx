import React from 'react';
import s from './title.module.scss';


const Title = ({title}) => {

    return (
        <div className={s.sectionTitle}>
            <h4>{title}</h4>
            <div></div>
        </div>
    );
}

export default Title;