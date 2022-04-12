import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import PathFinder from './PathFindingVisulizer/pathFindingVisualizer';
import Sort from './SortingVisualizer/sort';

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/sort" exact element={<Sort />}/>
                <Route path="/path-finding" exact element={<PathFinder />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;