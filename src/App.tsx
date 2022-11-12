import {Routes, Route} from "react-router-dom";
import React, {ReactNode} from 'react';

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom/SingleRoom";
import Error from "./pages/Error";
import MainLayout from "./layouts/MainLayout";


type RouteItem = {
    path: string;
    element: ReactNode;
}

const routes: RouteItem[] = [
    {
        path: '',
        element: <Home/>
    },
    {
        path: '/rooms',
        element: <Rooms/>
    },
    {
        path: '/room/:slug',
        element: <SingleRoom/>
    },
    {
        path: '/*',
        element: <Error/>
    }
]


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                {
                    routes.map((route, index) => {
                        return (
                            <Route key={index} {...route}/>
                        )
                    })
                }
            </Route>
        </Routes>
    );
}

export default App;