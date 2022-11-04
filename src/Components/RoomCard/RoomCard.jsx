import React from 'react';
import {Link} from "react-router-dom";

import s from './roomCard.module.scss';


const RoomCard = ({name, slug, images, price}) => {

    return (
        <article className={s.room}>
            <Link to={`/room/${slug}`} className={s.roomLink}>
                <div className={s.imgContainer}>
                    <img src={images[0]} alt={name + ' image-link'}/>
                    <div className={s.priceTop}>
                        <h6>${price}</h6>
                        <p>per night</p>
                    </div>
                </div>
                <p className={s.roomInfo}>{name}</p>
            </Link>
        </article>
    );
}

export default RoomCard;