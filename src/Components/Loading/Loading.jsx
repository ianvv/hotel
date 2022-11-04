import React from 'react';

import loadingArrow from '../../assets/img/gif/loading-arrow.gif';
import s from './loading.module.scss';


const Loading = ({text}) => {

    return (
        <div className={s.loadingArrow}>
            <h4>{text}</h4>
            <img src={loadingArrow} alt=""/>
        </div>
    );
}

export default Loading;