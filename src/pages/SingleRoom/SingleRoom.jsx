import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import Loading from "../../Components/Loading/Loading";
import {fetchRoom, loadingStatus, roomsSelector} from "../../redux/slices/RoomsSlice";
import {StyledWrapper} from "../../assets/styles/styledComponents";
import s from './singleRoom.module.scss';
import styles from '../../assets/styles/commonStyles.module.scss';


const SingleRoom = () => {

    const {singleRoom, status} = useSelector(roomsSelector);
    const dispatch = useDispatch();
    const {slug} = useParams();

    useEffect(() => {
        const getSingleRoom = () => {
            dispatch(fetchRoom(slug));
        }
        getSingleRoom();
    }, []);

    const {name, description, capacity, size, price, facilities, breakfast, pets, images, smoking} = singleRoom;

    return (
        <>
            {
                status === loadingStatus.LOADING
                    ? <Loading text='Room data loading...'/>
                    : <div>
                        <StyledWrapper images={images}>
                            <div className={s.banner}>
                                <h1>Back to rooms</h1>
                                <Link to='/rooms' className={styles.buttonPrimary}>Back to rooms</Link>
                            </div>
                        </StyledWrapper>
                        <h1 className={s.roomTitle}>{name}</h1>
                        <div className={s.titleBorder}></div>
                        <section className={s.singleRoom}>
                            <div className={s.singleRoomImages}>
                                {
                                    images && images.map((img, index) => {
                                        return <img src={img} alt={name} key={index}/>
                                    })
                                }
                            </div>
                            <div className={s.singleRoomInfo}>
                                <article className={s.description}>
                                    <h3>details</h3>
                                    <p>{description}</p>
                                </article>
                                <article className={s.info}>
                                    <h3>info</h3>
                                    <h6>price: {price ? `${price} $` : 'no information'}</h6>
                                    <h6>size: {size ? `${size} m²` : 'no information'}</h6>
                                    <h6>max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                                    <h6>pets: {pets ? 'allowed' : 'not allowed'}</h6>
                                    <h6>breakfast: {breakfast ? 'included' : 'not included'}</h6>
                                    <h6>smoking: {smoking ? 'allowed' : 'not allowed'}</h6>
                                </article>
                            </div>
                        </section>
                        <section className={s.roomFacilities}>
                            <h6>facilities</h6>
                            <ul className={s.facilities}>
                                {
                                    facilities
                                        ? facilities.map((item, index) => {
                                            return <li key={index}>- {item}</li>
                                        })
                                        : <li>no information</li>
                                }
                            </ul>
                        </section>
                    </div>
            }
        </>
    );
}

export default SingleRoom;