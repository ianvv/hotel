import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from "../Components/Header/Header";
import '../App.css';


const MainLayout = () => {

    return (
        <>
            <Header/>
            <div className='app'>
                <Outlet/>
            </div>
        </>
    );
}

export default MainLayout;