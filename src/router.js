import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import Sort from './SortingVisualizer/sort';

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/sort" exact element={<Sort />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;