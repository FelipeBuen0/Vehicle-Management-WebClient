import React from "react";
import Home from "./home/home";
import Vehicle from "./vehicles/vehicle";
import VehicleNew from "./vehicles/new/vehicleNew";
import { Route, Routes } from 'react-router-dom';
const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/vehicle" element={<Vehicle/>} />
            <Route path="/vehicle/new" element={<VehicleNew/>} />
        </Routes>
    )
}

export default Main