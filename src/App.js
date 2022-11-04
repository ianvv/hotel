import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom/SingleRoom";
import Error from "./pages/Error";
import MainLayout from "./layouts/MainLayout";


function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/rooms' element={<Rooms/>}/>
                    <Route path='/room/:slug' element={<SingleRoom/>}/>
                    <Route path='/*' element={<Error/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;